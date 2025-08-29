import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlayerDetails, createPlayer, updatePlayer } from '../../services/playerService';
import { getTeams } from '../../services/teamsService';

export const PlayerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    jerseyNumber: '',
    age: '',
    nationality: '',
    bio: '',
    joinedDate: '',
    teamId: '',
    isActive: true,
    // New fields
    height: '',
    weight: '',
    preferredFoot: '',
    matchesPlayed: '',
    goalsScored: '',
    assists: '',
    cleanSheets: '',
    passAccuracy: '',
    tackleSuccessRate: '',
    careerHighlights: '',
    // Image fields
    image: null,
    imageUrl: '',
    image2: null,
    imageUrl2: '',
    image3: null,
    imageUrl3: ''
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const t = await getTeams();
        setTeams(t);
      } catch (err) {
        console.error('Error fetching teams:', err);
      }
      if (id) {
        try {
          const player = await getPlayerDetails(id);
          setFormData({
            name: player.name || '',
            position: player.position || '',
            jerseyNumber: player.jerseyNumber || '',
            age: player.age || '',
            nationality: player.nationality || '',
            bio: player.bio || '',
            joinedDate: player.joinedDate ? player.joinedDate.slice(0, 10) : '',
            teamId: player.team?.id || '',
            isActive: player.isActive ?? true,
            // New fields
            height: player.height || '',
            weight: player.weight || '',
            preferredFoot: player.preferredFoot || '',
            matchesPlayed: player.matchesPlayed || '',
            goalsScored: player.goalsScored || '',
            assists: player.assists || '',
            cleanSheets: player.cleanSheets || '',
            passAccuracy: player.passAccuracy || '',
            tackleSuccessRate: player.tackleSuccessRate || '',
            careerHighlights: player.careerHighlights || '',
            // Image fields
            image: null, // Reset file input on load
            imageUrl: player.imageUrl || '',
            image2: null,
            imageUrl2: player.imageUrl2 || '',
            image3: null,
            imageUrl3: player.imageUrl3 || ''
          });
        } catch (error) {
          console.error('Error fetching player:', error);
        }
      }
      setLoading(false);
    };
    fetchPlayer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files && files.length > 0 ? files[0] : null;
      // Determine the correct imageUrl state name based on the input name
      let imageUrlName = '';
      if (name === 'image') imageUrlName = 'imageUrl';
      else if (name === 'image2') imageUrlName = 'imageUrl2';
      else if (name === 'image3') imageUrlName = 'imageUrl3';

      setFormData(prev => ({
        ...prev,
        [name]: file,
        [imageUrlName]: file ? URL.createObjectURL(file) : '' // Clear preview if file is removed
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the player data object
      const playerDataObject = {
        name: formData.name,
        position: formData.position,
        jerseyNumber: formData.jerseyNumber,
        age: formData.age,
        nationality: formData.nationality,
        bio: formData.bio,
        joinedDate: formData.joinedDate,
        // teamCategory removed; using teamId only
        teamId: formData.teamId || null,
        isActive: formData.isActive,
        // New fields
        height: formData.height,
        weight: formData.weight,
        preferredFoot: formData.preferredFoot,
        matchesPlayed: formData.matchesPlayed,
        goalsScored: formData.goalsScored,
        assists: formData.assists,
        cleanSheets: formData.cleanSheets,
        passAccuracy: formData.passAccuracy,
        tackleSuccessRate: formData.tackleSuccessRate,
        careerHighlights: formData.careerHighlights,
      };

      if (id) {
        // Call updatePlayer with the player data object and the image files
        await updatePlayer(id, playerDataObject, formData.image, formData.image2, formData.image3);
      } else {
        // Call createPlayer with the player data object and the image files
        await createPlayer(playerDataObject, formData.image, formData.image2, formData.image3);
      }
      navigate('/admin/players');
    } catch (error) {
      console.error('Error saving player:', error);
      // Display a user-friendly error message
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Player' : 'Add New Player'}
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Team</label>
            <select
              name="teamId"
              value={formData.teamId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Unassigned</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Position</option>
              <option value="GOALKEEPER">Goalkeeper</option>
              <option value="DEFENDER">Defender</option>
              <option value="MIDFIELDER">Midfielder</option>
              <option value="FORWARD">Forward</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Jersey Number</label>
            <input
              type="number"
              name="jerseyNumber"
              value={formData.jerseyNumber}
              onChange={handleChange}
              required
              min="1"
              max="99"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="16"
              max="45"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Joined Date</label>
            <input
              type="date"
              name="joinedDate"
              value={formData.joinedDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block mb-1">Active</label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            <span>{formData.isActive ? 'Yes' : 'No'}</span>
          </div>

          {/* New Player Stats */}
          <div className="md:col-span-2 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Player Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Preferred Foot</label>
                <select
                  name="preferredFoot"
                  value={formData.preferredFoot}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Foot</option>
                  <option value="LEFT">Left</option>
                  <option value="RIGHT">Right</option>
                  <option value="BOTH">Both</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Matches Played</label>
                <input
                  type="number"
                  name="matchesPlayed"
                  value={formData.matchesPlayed}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Goals Scored</label>
                <input
                  type="number"
                  name="goalsScored"
                  value={formData.goalsScored}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Assists</label>
                <input
                  type="number"
                  name="assists"
                  value={formData.assists}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Clean Sheets</label>
                <input
                  type="number"
                  name="cleanSheets"
                  value={formData.cleanSheets}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Pass Accuracy (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="passAccuracy"
                  value={formData.passAccuracy}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Tackle Success Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="tackleSuccessRate"
                  value={formData.tackleSuccessRate}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Career Highlights</label>
                <textarea
                  name="careerHighlights"
                  value={formData.careerHighlights}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Image Uploads */}
          <div className="md:col-span-2 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Player Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">Image 1</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Preview 1" className="mt-2 h-24 w-24 object-cover rounded" />
                )}
              </div>
              <div>
                <label className="block mb-1">Image 2</label>
                <input
                  type="file"
                  name="image2"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                {formData.imageUrl2 && (
                  <img src={formData.imageUrl2} alt="Preview 2" className="mt-2 h-24 w-24 object-cover rounded" />
                )}
              </div>
              <div>
                <label className="block mb-1">Image 3</label>
                <input
                  type="file"
                  name="image3"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                {formData.imageUrl3 && (
                  <img src={formData.imageUrl3} alt="Preview 3" className="mt-2 h-24 w-24 object-cover rounded" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/players')}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-sas-green-700 text-white rounded hover:bg-sas-green-800"
          >
            {id ? 'Update Player' : 'Add Player'}
          </button>
        </div>
      </form>
    </div>
  );
};
