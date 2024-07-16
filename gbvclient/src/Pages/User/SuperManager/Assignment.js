import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetData } from '../../../CustomHook/GetHook';
import { useUpdateData } from '../../../CustomHook/updatehooks';
import Button from '@mui/material/Button';

const AssignComponent = () => {
  const location = useLocation();
  const data = location.state;
  const { Email, Profile } = data;
  const { firstName, lastName, phoneNumber, Role, Gender, Specialization, Organization } = Profile;

  const [formData, setFormData] = useState({
    email: '', // Add email to the initial state
    roleId: '',
    specializationId: '',
    organizationId: ''
  });

  const { data: roleData, loading: roleLoading, error: errorRole, fetchData: fetchRole } = useGetData("/entry/getRole");
  const { data: specializationData, loading: specializationLoading, error: errorSpecialization, fetchData: fetchSpecialization } = useGetData("/entry/getSpecialization");
  const { data: organizationData, loading: organizationLoading, error: errorOrganization, fetchData: fetchOrganization } = useGetData("/entry/getOrganization");
  const { data: update, error: errorUpdating, loading, updateData: updateProfile } = useUpdateData('user/assignProfile');

  useEffect(() => {
    fetchRole();
    fetchSpecialization();
    fetchOrganization();
  }, []);

  if (!data) {
    return <div>No data received</div>;
  }

  // Render loading state
  if (roleLoading || specializationLoading || organizationLoading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (errorRole || errorSpecialization || errorOrganization) {
    return (
      <div>
        {errorRole && <div>Error fetching roles: {errorRole}</div>}
        {errorSpecialization && <div>Error fetching specializations: {errorSpecialization}</div>}
        {errorOrganization && <div>Error fetching organizations: {errorOrganization}</div>}
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the updateProfile function to send the data to the server
      await updateProfile(formData);
      // Do something with the response if needed
    } catch (error) {
      // Handle errors if necessary
    }
  };

  const handleChange = (e) => {
    // Update the formData state with the email and the ID of the selected option
    setFormData({ ...formData, email: Email, [e.target.name]: e.target.value });
  };

  return (
    <div className='SuperManager-AssignComponent'>
      <p>UserDetails</p>
      <div className='AssignedUser'>
        <div>Email: {Email}</div>
        <div>First Name: {firstName}</div>
        <div>Last Name: {lastName}</div>
        <div>Phone Number: {phoneNumber}</div>
        <div>Role: {Role?.Role || '-'}</div>
        <div>Gender: {Gender?.Gender || '-'}</div>
        <div>Specialization: {Specialization?.type || '-'}</div>
        <div>Organization: {Organization?.Name || '-'}</div>
      </div>

      <form className='assignform' onSubmit={handleSubmit}>
        {/* Select Role */}
        <div>
          <h2>Select Role</h2>
          <select name="roleId" value={formData.roleId} onChange={handleChange}>
            <option value="">Select a role</option>
            {roleData.roles && roleData.roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.Role}
              </option>
            ))}
          </select>
        </div>

        {/* Select Specialization */}
        <div>
          <h2>Select Specialization</h2>
          <select name="specializationId" value={formData.specializationId} onChange={handleChange}>
            <option value="">Select a specialization</option>
            {specializationData?.specializations && specializationData.specializations.map((specialization) => (
              <option key={specialization.id} value={specialization.id}>
                {specialization.type}
              </option>
            ))}
          </select>
        </div>

        {/* Select Organization */}
        <div>
          <h2>Select Organization</h2>
          <select name="organizationId" value={formData.organizationId} onChange={handleChange}>
            <option value="">Select an organization</option>
            {organizationData?.organizations && organizationData.organizations.map((organization) => (
              <option key={organization.id} value={organization.id}>
                {organization.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
      {errorUpdating && <p>Error: {errorUpdating}</p>}
      {update && <p>Response: {update}</p>}
    </div>
  );
};

export default AssignComponent;