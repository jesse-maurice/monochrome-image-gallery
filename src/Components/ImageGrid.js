import '../Components/ImageModal';

import React, {
  useEffect,
  useState,
} from 'react';

import ImageModal from '../Components/ImageModal';
import imageList from '../server/images.json';

// Function to import all images dynamically
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// Import images from the directory
const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
;


const ImageGrid = () => {
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [filteredImages, setFilteredImages] = useState(imageList);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDetails, setSelectedImageDetails] = useState();
   const [isCollected, setIsCollected] = useState(false);
  //  const [likes, setLikes] = useState(0);
   const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup function to clear the timeout when component unmounts
    return () => clearTimeout(loadingTimeout);
  }, []);

    useEffect(() => {
      // Filter images based on searchValue
      const filtered = imageList
        .filter((image) =>
          image.tag.some((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          )
        )
        .map((image) => ({
          ...image,
          src: images[image.src], // Update the src to the imported image
        }));
      setFilteredImages(filtered);
    }, [searchValue]);


   const openModal = (image) => {
     setSelectedImage(image);
  };
  
  const closeImageDetailsModal = () => {
    setSelectedImageDetails(null);
  };

   const closeModal = () => {
     setSelectedImage(null);
  };
  
  const handleCollection = () => {
    setIsCollected(!isCollected);
    // Additional logic for when an item is collected or uncollected
  };

  // Handle likes increment
  const handleLikes = () => {
    // setLikes((prevLikes) => prevLikes + 1);
    setIsLiked(!isLiked); // Correctly increment likes
    // Additional logic for when an item is liked
  };

  return (
    <div className="grid-container px-4 lg:px-10 max-sm:px-4">
      <div className="flex flex-row content-center justify-between w-full">
        <h1 className="font-rale font-semibold text-2xl py-[60px] max-sm:hidden">
          Free Stock Photos
        </h1>
        <form className="py-[60px] w-full max-w-md">
          <div className="relative flex items-center">
            <i className="fa-solid absolute w-[13px] h-[13px] pointer-events-none ml-3 fa-magnifying-glass fa-beat-fade"></i>
            <input
              type="text"
              name="search"
              placeholder="Search Images..."
              autoComplete="off"
              className="w-full px-3 py-[10px] max-sm:py-[15px] pl-10 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-[30px] md:gap-[20px] max-sm:gap-[25px]">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="w-full bg-gray-300 rounded-lg h-60"></div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-[20px] md:gap-[15px] max-sm:gap-[15px]">
          {filteredImages.map((image, index) => (
            <li
              key={index}
              className="relative cursor-pointer"
              onClick={() => openModal(image)}
            >
              <img
                src={image.src}
                alt={`frame${index}`}
                className="w-auto h-auto cursor-pointer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300">
                <div className="flex absolute top-5 right-5 items-center justify-center gap-2">
                  {/* <button
                    onClick={handleCollection}
                    className="text-black py-2 px-4 bg-white rounded-xl"
                  >
                    <i className="fa-regular fa-bookmark text-xl"></i>
                  </button> */}
                  {/* <button
                    onClick={handleLikes}
                    className="text-black py-2 px-3 text-xl bg-white rounded-xl"
                  >
                    <i
                      className={
                        isLiked
                          ? "fa-solid fa-heart text-red-500"
                          : "fa-regular fa-heart"
                      }
                    ></i>
                  </button> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ImageModal image={selectedImage} onClose={closeModal} />
    </div>
  );
};


export default ImageGrid;
