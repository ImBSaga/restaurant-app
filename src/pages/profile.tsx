import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/services/queries/useAuth";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { User, Phone, Mail, Lock, Edit2 } from "lucide-react";

export default function ProfilePage() {
  const { data: profileData, isLoading, error } = useGetProfileQuery();
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateProfileMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
  });

  const user = profileData?.data;

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        phone: user.phone,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.currentPassword) {
      alert("Please enter your current password to update profile");
      return;
    }

    updateProfile(
      {
        name: formData.name,
        phone: formData.phone,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setFormData((prev) => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
          }));
          alert("Profile updated successfully");
        },
        onError: (err) => {
          console.error(err);
          alert("Failed to update profile. Please check your password.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading profile. Please try again later.
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="bg-blue-500 p-8 flex flex-col items-center text-white">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 text-blue-500">
            <User className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-blue-100">{user.email}</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />
                Update Profile
              </button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Update your profile information here.
              </DialogDescription>
              <div className="flex flex-col gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-9 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-9 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="081234567890"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Current Password (Required)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full pl-9 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    New Password (Optional)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full pl-9 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <button
                  onClick={handleSubmit}
                  disabled={isUpdating}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
