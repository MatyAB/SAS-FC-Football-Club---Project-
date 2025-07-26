# SAS-FC Football Club Backend Documentation

This document provides an overview of the backend architecture, guidelines for creating new classes, understanding data flow, and using Postman to interact with the API.

## 1. Backend Architecture Overview

The SAS-FC Football Club backend is built using Spring Boot, following a layered architecture to separate concerns and promote maintainability.

### Key Layers and Their Responsibilities:

*   **`com.sasfc.api` (Main Application & Initializer):**
    *   `SasFcApiApplication.java`: The main entry point of the Spring Boot application.
    *   `ServletInitializer.java`: Configures the application for deployment as a WAR file in a servlet container.

*   **`com.sasfc.api.config` (Configuration):**
    *   `FileStorageProperties.java`: Manages properties related to file storage (e.g., upload directory).
    *   `SecurityConfig.java`: Defines the security configuration for the application, including password encoding, CORS settings, and HTTP security rules (e.g., authentication, authorization).

*   **`com.sasfc.api.controller` (Controllers - API Endpoints):**
    *   These classes handle incoming HTTP requests from the frontend.
    *   They define the API endpoints (URLs) and map them to specific methods.
    *   Controllers receive data from requests (often as DTOs), delegate business logic to service classes, and return HTTP responses (e.g., JSON data, status codes).
    *   Examples: `AdminController`, `AuthController`, `NewsController`.

*   **`com.sasfc.api.dto` (Data Transfer Objects):**
    *   Simple Java objects used to transfer data between different layers of the application, especially between the frontend and backend.
    *   They represent the data structure expected in API requests (e.g., `CreateUserRequest`, `LoginRequest`) and responses (e.g., `UserDto`, `NewsDto`).
    *   DTOs help decouple the API contract from the internal domain models.]\
    

*   **`com.sasfc.api.exception` (Custom Exceptions):**
    *   Defines custom exception classes to handle specific error scenarios gracefully (e.g., `DuplicateResourceException`, `ResourceNotFoundException`, `FileStorageException`).
    *   These exceptions are typically thrown by service or repository layers and caught by global exception handlers (if implemented) to return appropriate HTTP error responses.

*   **`com.sasfc.api.mapper` (Mappers):**
    *   Utility classes responsible for converting data between different object types, primarily between DTOs and Model (entity) objects.
    *   This separation ensures that business logic operates on domain models, while API interactions use DTOs.
    *   Examples: `ContentMapper` (for News, Match, Team, GalleryImage), `UserMapper` (for User, Role, Permission).

*   **`com.sasfc.api.model` (Models - Entities):**
    *   These classes represent the core domain objects and map directly to database tables (using JPA annotations).
    *   They define the structure and relationships of the data stored in the database.
    *   Examples: `GalleryImage`, `Match`, `News`, `Permission`, `Player`, `Role`, `Team`, `User`.
    *   `enums` sub-package contains enumerations for various categories and statuses (e.g., `GalleryCategory`, `MatchStatus`, `NewsCategory`, `PlayerPosition`, `TeamCategory`).

*   **`com.sasfc.api.repository` (Repositories - Data Access Layer):**
    *   Interfaces that extend Spring Data JPA's `JpaRepository`.
    *   They provide methods for performing CRUD (Create, Read, Update, Delete) operations on the database entities.
    *   Spring Data JPA automatically generates the implementation for these interfaces.
    *   Examples: `MatchRepository`, `NewsRepository`, `PermissionRepository`, `RoleRepository`, `TeamRepository`, `UserRepository`.

*   **`com.sasfc.api.security` (Security Utilities):**
    *   `JwtUtil.java`: Handles the creation, validation, and parsing of JSON Web Tokens (JWTs) for authentication.

*   **`com.sasfc.api.service` (Services - Business Logic Layer):**
    *   These classes encapsulate the core business logic of the application.
    *   They interact with repositories to retrieve and persist data, and perform operations that involve multiple entities or complex logic.
    *   Services are typically transactional and contain the "rules" of the application.
    *   Examples: `FileStorageService`, `MatchService`, `NewsService`, `UserService`.

*   **`com.sasfc.api.util` (Utilities):**
    *   `DataInitializer.java`: Used for initializing data in the database, often for development or testing purposes.

## 2. How to Create New Classes

When adding new functionality, you'll typically create classes across several layers. Let's walk through an example of creating a new `Comment` feature for news articles.

### Step 1: Create the Model (Entity)

First, define the `Comment` entity that will be stored in the database.

**File:** `src/main/java/com/sasfc/api/model/Comment.java`

```java
package com.sasfc.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id", nullable = false)
    private News news; // Link to the News article

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Link to the User who made the comment

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}
```

### Step 2: Create the Repository

Define an interface for database operations on the `Comment` entity.

**File:** `src/main/java/com/sasfc/api/repository/CommentRepository.java`

```java
package com.sasfc.api.repository;

import com.sasfc.api.model.Comment;
import com.sasfc.api.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findByNewsOrderByCreatedAtDesc(News news);
}
```

### Step 3: Create DTOs for Request and Response

Define how `Comment` data will look when sent from/to the frontend.

**File:** `src/main/java/com/sasfc/api/dto/CreateCommentRequest.java`

```java
package com.sasfc.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateCommentRequest {
    @NotNull(message = "News ID cannot be null")
    private UUID newsId;

    @NotBlank(message = "Content cannot be blank")
    private String content;
}
```

**File:** `src/main/java/com/sasfc/api/dto/CommentDto.java`

```java
package com.sasfc.api.dto;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CommentDto {
    private UUID id;
    private UUID newsId;
    private UserDto user; // Assuming UserDto is available
    private String content;
    private Date createdAt;
    private Date updatedAt;
}
```

### Step 4: Create the Mapper

Add methods to convert between `Comment` entity and `CommentDto`. You might add this to an existing `ContentMapper` or create a new `CommentMapper`. For simplicity, let's assume we extend `ContentMapper`.

**File:** `src/main/java/com/sasfc/api/mapper/ContentMapper.java` (Add these methods)

```java
// ... existing imports and class definition ...

    public static CommentDto toCommentDto(Comment comment) {
        if (comment == null) return null;
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setNewsId(comment.getNews().getId());
        dto.setUser(UserMapper.toUserDto(comment.getUser())); // Assuming UserMapper exists
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());
        return dto;
    }

    public static Comment toCommentEntity(CreateCommentRequest dto, News news, User user) {
        if (dto == null) return null;
        Comment comment = new Comment();
        comment.setNews(news);
        comment.setUser(user);
        comment.setContent(dto.getContent());
        return comment;
    }
```

### Step 5: Create the Service

Implement the business logic for comments.

**File:** `src/main/java/com/sasfc/api/service/CommentService.java`

```java
package com.sasfc.api.service;

import com.sasfc.api.dto.CommentDto;
import com.sasfc.api.dto.CreateCommentRequest;
import com.sasfc.api.exception.ResourceNotFoundException;
import com.sasfc.api.mapper.ContentMapper;
import com.sasfc.api.model.Comment;
import com.sasfc.api.model.News;
import com.sasfc.api.model.User;
import com.sasfc.api.repository.CommentRepository;
import com.sasfc.api.repository.NewsRepository;
import com.sasfc.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final NewsRepository newsRepository;
    private final UserRepository userRepository; // Assuming you have a UserRepository

    @Autowired
    public CommentService(CommentRepository commentRepository, NewsRepository newsRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CommentDto createComment(CreateCommentRequest request, UUID userId) {
        News news = newsRepository.findById(request.getNewsId())
                .orElseThrow(() -> new ResourceNotFoundException("News not found with id " + request.getNewsId()));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        Comment comment = ContentMapper.toCommentEntity(request, news, user);
        comment = commentRepository.save(comment);
        return ContentMapper.toCommentDto(comment);
    }

    public List<CommentDto> getCommentsByNewsId(UUID newsId) {
        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new ResourceNotFoundException("News not found with id " + newsId));
        return commentRepository.findByNewsOrderByCreatedAtDesc(news).stream()
                .map(ContentMapper::toCommentDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteComment(UUID commentId, UUID userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id " + commentId));

        // Authorization check: Only the comment owner or an admin can delete
        // This would typically involve checking user roles/permissions
        if (!comment.getUser().getId().equals(userId) /* && !userIsAdmin(userId) */) {
            throw new SecurityException("User not authorized to delete this comment");
        }

        commentRepository.delete(comment);
    }
}
```

### Step 6: Create the Controller

Expose the API endpoints for comments.

**File:** `src/main/java/com/sasfc/api/controller/CommentController.java`

```java
package com.sasfc.api.controller;

import com.sasfc.api.dto.CommentDto;
import com.sasfc.api.dto.CreateCommentRequest;
import com.sasfc.api.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CommentDto> createComment(@Valid @RequestBody CreateCommentRequest request,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        // In a real application, you'd get the actual userId from userDetails
        // For now, let's assume a placeholder or retrieve it from a custom UserDetails implementation
        UUID userId = UUID.fromString(userDetails.getUsername()); // Assuming username is UUID for simplicity

        CommentDto createdComment = commentService.createComment(request, userId);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @GetMapping("/news/{newsId}")
    public ResponseEntity<List<CommentDto>> getCommentsByNewsId(@PathVariable UUID newsId) {
        List<CommentDto> comments = commentService.getCommentsByNewsId(newsId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable UUID commentId,
                                              @AuthenticationPrincipal UserDetails userDetails) {
        UUID userId = UUID.fromString(userDetails.getUsername()); // Assuming username is UUID
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.noContent().build();
    }
}
```

### Step 7: Update Security Configuration (if necessary)

Ensure your `SecurityConfig.java` allows access to the new endpoints based on roles/permissions. For example, if only authenticated users can create comments:

**File:** `src/main/java/com/sasfc/api/config/SecurityConfig.java` (Add to `filterChain` method)

```java
// ... inside filterChain method ...
                .requestMatchers("/api/comments").authenticated() // Requires authentication for /api/comments
                .requestMatchers(HttpMethod.GET, "/api/comments/news/**").permitAll() // Allow anyone to view comments
                .requestMatchers(HttpMethod.DELETE, "/api/comments/**").authenticated() // Requires authentication for deleting comments
                // ... other rules ...
```

## 3. How Data is Passed from Class to Class

Data flows through the layers in a structured manner, often transforming its shape (from DTO to Model and back) as it moves.

### Example: Creating a News Article

1.  **Frontend to Controller (`NewsController`):**
    *   The frontend sends an HTTP POST request to `/api/news` with a JSON payload representing the new news article.
    *   Spring Boot automatically binds this JSON to a `CreateNewsRequest` DTO object in the `NewsController.createNews` method.
    *   `CreateNewsRequest` contains fields like `title`, `content`, `category`, `imageFile`, etc.

2.  **Controller to Service (`NewsService`):**
    *   The `NewsController` calls `newsService.createNews(request, authorId)`.
    *   The `CreateNewsRequest` DTO is passed to the service. The controller might also extract user information (like `authorId`) from the authenticated user's details and pass it along.

3.  **Service to Mapper (`ContentMapper`):**
    *   Inside `NewsService.createNews`, the service needs to convert the `CreateNewsRequest` DTO into a `News` entity object that can be saved to the database.
    *   It calls `ContentMapper.toNewsEntity(request, author)` to perform this conversion. The mapper takes the DTO and potentially other related entities (like the `User` object for the author) to construct a complete `News` entity.

4.  **Service to Repository (`NewsRepository`):**
    *   The `NewsService` then calls `newsRepository.save(newsEntity)` to persist the `News` entity to the database.
    *   The repository handles the actual database interaction.

5.  **Repository back to Service:**
    *   After saving, the `newsRepository.save` method returns the persisted `News` entity (which might now have an auto-generated ID or updated timestamps). This entity is returned to the `NewsService`.

6.  **Service to Mapper (`ContentMapper`):**
    *   The `NewsService` now has the saved `News` entity. To send a response back to the frontend, it needs to convert this entity into a `NewsDto`.
    *   It calls `ContentMapper.toNewsDto(newsEntity)` to perform this conversion.

7.  **Service back to Controller:**
    *   The `NewsDto` is returned from the `NewsService` to the `NewsController`.

8.  **Controller back to Frontend:**
    *   The `NewsController` wraps the `NewsDto` in a `ResponseEntity` (e.g., `new ResponseEntity<>(createdNews, HttpStatus.CREATED)`) and sends it back as a JSON response to the frontend.

### Summary of Data Flow:

*   **Request (Frontend -> Backend):** Frontend sends JSON -> Controller receives DTO -> Service receives DTO -> Mapper converts DTO to Model -> Repository saves Model.
*   **Response (Backend -> Frontend):** Repository returns Model -> Service receives Model -> Mapper converts Model to DTO -> Service returns DTO -> Controller returns DTO as JSON -> Frontend receives JSON.

## 4. How to Use Postman

Postman is a powerful tool for testing APIs. Here's how you can use it to interact with your backend.

### Basic Setup:

1.  **Install Postman:** Download and install the Postman desktop application.
2.  **Start Your Backend:** Ensure your Spring Boot application is running (e.g., `mvn spring-boot:run` or run from your IDE). It typically runs on `http://localhost:8080`.

### Common Request Types:

#### A. GET Request (Retrieve Data)

**Example: Get All News Articles**

*   **Method:** `GET`
*   **URL:** `http://localhost:8080/api/news`
*   **Headers:** (None required for public endpoints)
*   **Body:** (None)

**Steps in Postman:**
1.  Select `GET` from the dropdown menu.
2.  Enter `http://localhost:8080/api/news` in the URL field.
3.  Click "Send".
4.  The response will appear in the "Response" section, typically as a JSON array of news articles.

**Example: Get News Article by ID**

*   **Method:** `GET`
*   **URL:** `http://localhost:8080/api/news/{id}` (Replace `{id}` with an actual UUID, e.g., `http://localhost:8080/api/news/a1b2c3d4-e5f6-7890-1234-567890abcdef`)
*   **Headers:** (None)
*   **Body:** (None)

#### B. POST Request (Create Data)

**Example: Create a New User (Editor Role)**

*   **Method:** `POST`
*   **URL:** `http://localhost:8080/api/admin/users/editor`
*   **Headers:**
    *   `Content-Type`: `application/json`
    *   `Authorization`: `Bearer <YOUR_JWT_TOKEN>` (You'll need to get a token from the login endpoint first)
*   **Body:**
    *   Select `raw` and `JSON` from the body tab.
    *   Enter the JSON payload:

    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "SecurePassword123!"
    }
    ```

**Steps in Postman:**
1.  Select `POST` from the dropdown menu.
2.  Enter the URL.
3.  Go to the "Headers" tab and add `Content-Type` with value `application/json`. Add `Authorization` with your JWT token.
4.  Go to the "Body" tab, select `raw` and then `JSON` from the type dropdown.
5.  Paste the JSON payload.
6.  Click "Send".
7.  The response will typically be the created user object and a `201 Created` status.

#### C. PUT Request (Update Data)

**Example: Update a News Article**

*   **Method:** `PUT`
*   **URL:** `http://localhost:8080/api/news/{id}` (Replace `{id}` with the ID of the news article to update)
*   **Headers:**
    *   `Content-Type`: `application/json` (or `multipart/form-data` if updating image)
    *   `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
*   **Body:** (JSON payload with updated fields)

    ```json
    {
        "title": "Updated News Title",
        "content": "This is the updated content of the news article.",
        "category": "MATCH_REPORT",
        "isFeatured": true
        // ... other fields you want to update
    }
    ```
    *Note: For `updateNews` with file upload, you might need to use `form-data` in Postman and include the file.*

#### D. DELETE Request (Delete Data)

**Example: Delete a News Article**

*   **Method:** `DELETE`
*   **URL:** `http://localhost:8080/api/news/{id}` (Replace `{id}` with the ID of the news article to delete)
*   **Headers:**
    *   `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
*   **Body:** (None)

**Steps in Postman:**
1.  Select `DELETE` from the dropdown menu.
2.  Enter the URL.
3.  Go to the "Headers" tab and add `Authorization` with your JWT token.
4.  Click "Send".
5.  A successful deletion will typically return a `204 No Content` status.

### Handling Authentication (JWT Tokens):

1.  **Login Request:**
    *   **Method:** `POST`
    *   **URL:** `http://localhost:8080/api/auth/login`
    *   **Headers:** `Content-Type: application/json`
    *   **Body (JSON):**
        ```json
        {
            "email": "admin@example.com",
            "password": "adminpassword"
        }
        ```
    *   Send this request. The response will contain a `token` field (your JWT).

2.  **Using the Token:**
    *   Copy the `token` value from the login response.
    *   For subsequent authenticated requests (POST, PUT, DELETE, or protected GETs), go to the "Headers" tab.
    *   Add a header:
        *   **Key:** `Authorization`
        *   **Value:** `Bearer <PASTE_YOUR_TOKEN_HERE>` (e.g., `Bearer eyJhbGciOiJIUzI1Ni...`)

### Postman Collections:

For better organization, you can create Postman Collections to group related requests (e.g., "Auth API", "News API", "Admin API"). You can also set environment variables (e.g., `baseUrl` for `http://localhost:8080`) to easily switch between environments (development, staging, production).

This documentation should provide a solid foundation for understanding and interacting with the SAS-FC backend.
