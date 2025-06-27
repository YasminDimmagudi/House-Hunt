import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👤 Your Profile</h1>
      {user ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.role && <p><strong>Role:</strong> {user.role}</p>}
        </div>
      ) : (
        <p className="text-red-500">You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
