import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSponsor, getSponsorById, updateSponsor, updateSponsorWithLogo } from '../../services/sponsorService';

const categories = ['PLATINUM', 'GOLD', 'SILVER'];

const resolveSponsorLogoUrl = (url) => {
  if (!url) return '/images/sponsor-default.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:8080${url}`;
  return url;
};

export const SponsorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slogan: '',
    website: '',
    category: 'GOLD',
    logo: null
  });
  const [logoPreview, setLogoPreview] = useState('');
  const [existingLogo, setExistingLogo] = useState('');

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      loadSponsor();
    }
  }, [id]);

  const loadSponsor = async () => {
    try {
      setLoading(true);
      const sponsor = await getSponsorById(id);
      setFormData({
        name: sponsor.name || '',
        description: sponsor.description || '',
        slogan: sponsor.slogan || '',
        website: sponsor.website || '',
        category: sponsor.category || 'GOLD',
        logo: null
      });
      setExistingLogo(sponsor.logo || '');
      setLogoPreview(resolveSponsorLogoUrl(sponsor.logo));
    } catch (error) {
      console.error('Error loading sponsor:', error);
      setError('Failed to load sponsor data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Sponsor name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      if (isEditing) {
        // Update existing sponsor
        if (formData.logo) {
          await updateSponsorWithLogo(id, formData);
        } else {
          await updateSponsor(id, formData);
        }
        setSuccess('Sponsor updated successfully!');
      } else {
        // Create new sponsor
        await createSponsor(formData);
        setSuccess('Sponsor created successfully!');
      }

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/admin/sponsors');
      }, 1500);
    } catch (error) {
      console.error('Error saving sponsor:', error);
      setError('Failed to save sponsor: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  if (loading && isEditing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sas-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sponsor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Sponsor' : 'Add New Sponsor'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditing ? 'Update sponsor information and logo' : 'Create a new sponsor for the club'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sponsor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sas-green-500 focus:border-transparent"
                placeholder="Enter sponsor name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sas-green-500 focus:border-transparent"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slogan
              </label>
              <input
                type="text"
                name="slogan"
                value={formData.slogan}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sas-green-500 focus:border-transparent"
                placeholder="Enter sponsor slogan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sas-green-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sas-green-500 focus:border-transparent"
                placeholder="Enter sponsor description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <div className="space-y-4">
                {/* Logo Preview */}
                {(logoPreview || existingLogo) && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                    <img
                      src={logoPreview || resolveSponsorLogoUrl(existingLogo)}
                      alt="Logo preview"
                      className="max-h-32 max-w-full object-contain mx-auto"
                    />
                  </div>
                )}

                {/* File Input */}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sas-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: PNG or JPG, max 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/admin/sponsors')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-sas-green-600 hover:bg-sas-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {isEditing ? 'Update Sponsor' : 'Create Sponsor'}
          </button>
        </div>
      </form>
    </div>
  );
};



