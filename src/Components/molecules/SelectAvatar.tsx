import React from "react";
import { FaCamera, FaPlus } from "react-icons/fa";

interface SelectAvatarProps {
  imageSrc?: string;
  onSelect?: () => void;
}

const SelectAvatar = ({ imageSrc, onSelect }: SelectAvatarProps) => {
  const [image, setImage] = React.useState<string | null>(imageSrc || null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
    if (onSelect) {
      onSelect();
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Clear the image
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="border-dashed border-2 border-sky-500 h-20 w-20 rounded-full cursor-pointer flex items-center justify-center relative"
        onClick={handleAvatarClick}
        role="button"
        aria-label="Select Avatar"
      >
        {image ? (
          <img
            src={image}
            alt="Avatar"
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center">
            <FaCamera size={24} className="text-sky-500" />
            <FaPlus
              size={27}
              className="absolute text-sky-500 top-0 right-0 bg-content1 rounded-full p-1"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="h-8">
        {/* Remove text */}
        {image && (
          <button
            onClick={handleRemoveImage}
            className="text-gray-400/25 font-semibold text-sm mt-2"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectAvatar;