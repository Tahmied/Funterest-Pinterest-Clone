'use client'
import { useEffect, useRef, useState } from 'react';

const MasonryGrid = () => {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [activeCategory, setActiveCategory] = useState('For You');
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [pinTitle, setPinTitle] = useState('');
    const [pinDesc, setPinDesc] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ title: '', desc: '' });

    const sentinelRef = useRef(null);
    const fileInputRef = useRef(null);

    const categories = ['For You', 'Home Decor', 'Food & Drink', 'Travel', 'Art', 'Nature', 'Fashion', 'DIY Crafts', 'Technology', 'Fitness'];

    // Sample pins data (replace with your API call)
    const samplePins = [
        { id: 1, imagePath: 'https://picsum.photos/400/600?random=1', title: 'Beautiful Sunset' },
        { id: 2, imagePath: 'https://picsum.photos/400/800?random=2', title: 'Modern Interior' },
        { id: 3, imagePath: 'https://picsum.photos/400/500?random=3', title: 'Delicious Food' },
        { id: 4, imagePath: 'https://picsum.photos/400/700?random=4', title: 'Mountain View' },
        { id: 5, imagePath: 'https://picsum.photos/400/650?random=5', title: 'Abstract Art' },
        { id: 6, imagePath: 'https://picsum.photos/400/550?random=6', title: 'Ocean Waves' },
        { id: 7, imagePath: 'https://picsum.photos/400/750?random=7', title: 'Fashion Style' },
        { id: 8, imagePath: 'https://picsum.photos/400/600?random=8', title: 'DIY Project' },
        { id: 9, imagePath: 'https://picsum.photos/400/680?random=9', title: 'Tech Gadget' },
        { id: 10, imagePath: 'https://picsum.photos/400/620?random=10', title: 'Fitness Goal' },
    ];

    const loadPins = async () => {
        setLoading(true);
        // Simulate API call - replace with your actual API
        await new Promise(resolve => setTimeout(resolve, 500));
        setPins(samplePins);
        setMaxPages(3);
        setLoading(false);
    };
    useEffect(() => {
        // Initial load
        loadPins();
    }, []);

    useEffect(() => {
        // Intersection Observer for infinite scroll
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && currentPage <= maxPages) {
                    loadMorePins();
                }
            },
            { root: null, rootMargin: '200px', threshold: 0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [loading, currentPage, maxPages]);



    const loadMorePins = async () => {
        if (loading || currentPage > maxPages) return;

        setLoading(true);
        // Simulate API call - replace with your actual API
        await new Promise(resolve => setTimeout(resolve, 500));

        const newPins = samplePins.map((pin, index) => ({
            ...pin,
            id: pins.length + index + 1,
            imagePath: `https://picsum.photos/400/${Math.floor(Math.random() * 300) + 500}?random=${pins.length + index + 1}`
        }));

        setPins([...pins, ...newPins]);
        setCurrentPage(currentPage + 1);
        setLoading(false);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = async () => {
        // Simulate upload - replace with your actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setShowModal(false);
        setToastMessage({ title: 'Pin uploaded', desc: 'Your pin is uploaded successfully' });
        setShowToast(true);

        setTimeout(() => setShowToast(false), 3000);

        // Reset form
        setSelectedFile(null);
        setPreview('');
        setPinTitle('');
        setPinDesc('');
    };

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 w-full bg-[rgba(15,17,22,0.95)] backdrop-blur-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.25)] z-[1000] px-5 h-[70px] flex items-center">
                <div className="flex justify-between items-center max-w-[1400px] mx-auto w-full">
                    <a href="#" className="text-[#06b6d4] text-[28px] sm:text-[22px] font-bold no-underline flex items-center tracking-[-0.5px]">
                        <img src="./Images/A.png" alt="" className="w-[40px] h-auto mr-2 sm:mr-1" />
                        An!mied
                    </a>

                    <div className="flex-grow max-w-[800px] mx-5 relative hidden sm:block">
                        <i className="fas fa-search absolute left-[18px] top-1/2 -translate-y-1/2 text-[#a8a8a8]"></i>
                        <input
                            type="text"
                            placeholder="Search for ideas"
                            className="w-full py-[14px] px-[48px] rounded-[24px] border-none bg-[rgba(255,255,255,0.08)] text-base text-white transition-all duration-300 ease-in-out focus:outline-none focus:bg-[rgba(255,255,255,0.12)] focus:shadow-[0_0_0_2px_#06b6d4]"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center w-11 h-11 md:w-auto md:h-auto md:py-[10px] md:px-4 rounded-full md:rounded-[24px] text-white no-underline font-medium transition-all duration-300 ease-in-out hover:bg-[rgba(255,255,255,0.1)]"
                        >
                            <i className="fas fa-plus text-xl"></i>
                            <span className="hidden md:inline ml-2">Upload</span>
                        </button>

                        <a
                            href="./profile.html"
                            className="flex items-center justify-center w-11 h-11 md:w-auto md:h-auto md:py-[10px] md:px-4 rounded-full md:rounded-[24px] text-white no-underline font-medium transition-all duration-300 ease-in-out hover:bg-[rgba(255,255,255,0.1)]"
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#00c2ff] text-white flex items-center justify-center font-bold">
                                U
                            </div>
                            <span className="hidden md:inline ml-2">Profile</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-[70px] px-5 max-w-[1400px] mx-auto">
                {/* Categories */}
                <div className="flex overflow-x-auto py-4 mb-6 gap-2 scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {categories.map((category) => (
                        <div
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`flex-shrink-0 py-[10px] px-[18px] rounded-[24px] font-semibold cursor-pointer transition-all duration-300 ease-in-out whitespace-nowrap text-sm ${activeCategory === category
                                    ? 'bg-[#06b6d4] text-white'
                                    : 'bg-[rgba(255,255,255,0.08)] text-white hover:bg-[#06b6d4]'
                                }`}
                        >
                            {category}
                        </div>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5">
                    {pins.map((pin) => (
                        <div
                            key={pin.id}
                            className="break-inside-avoid mb-5 rounded-[20px] overflow-hidden bg-[#1a1d25] shadow-[0_6px_25px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out relative cursor-pointer group hover:-translate-y-2 hover:bg-[#212530] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] animate-[fadeIn_0.5s_ease-out]"
                        >
                            <img
                                src={pin.imagePath}
                                alt={pin.title}
                                loading="lazy"
                                className="w-full block transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                            <button className="absolute top-4 right-4 bg-[#06b6d4] text-white border-none py-3 px-[18px] rounded-[24px] font-semibold cursor-pointer opacity-0 translate-y-[10px] transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[rgb(24,139,216)]">
                                Save
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent pt-20 px-5 pb-5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 sm:opacity-100 sm:pt-[60px] sm:px-[15px] sm:pb-[15px]">
                                <h3 className="font-semibold text-base mb-2 overflow-hidden text-ellipsis line-clamp-2">
                                    {pin.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading Animation */}
                {loading && (
                    <div className="flex items-center justify-center h-full w-full my-4">
                        <div className="h-5 w-5 mr-[10px] rounded-[10px] bg-[#06b6d4] animate-[pulse_1.5s_infinite_ease-in-out] [animation-delay:-0.3s]"></div>
                        <div className="h-5 w-5 mr-[10px] rounded-[10px] bg-[#06b6d4] animate-[pulse_1.5s_infinite_ease-in-out] [animation-delay:-0.1s]"></div>
                        <div className="h-5 w-5 mr-[10px] rounded-[10px] bg-[#06b6d4] animate-[pulse_1.5s_infinite_ease-in-out] [animation-delay:0.1s]"></div>
                        <div className="h-5 w-5 mr-[10px] rounded-[10px] bg-[#06b6d4] animate-[pulse_1.5s_infinite_ease-in-out]"></div>
                        <div className="h-5 w-5 rounded-[10px] bg-[#06b6d4] animate-[pulse_1.5s_infinite_ease-in-out]"></div>
                    </div>
                )}

                {/* Sentinel for infinite scroll */}
                <div ref={sentinelRef} className="h-px"></div>
            </main>

            {/* Upload Modal */}
            {showModal && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-[2000] flex items-center justify-center backdrop-blur-[5px]"
                    onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                >
                    <div className="bg-[#1a1d25] rounded-[20px] w-[90%] max-w-[500px] p-6 relative shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                        <span
                            onClick={() => setShowModal(false)}
                            className="absolute top-5 right-5 text-2xl cursor-pointer text-[#a8a8a8] transition-colors duration-300 ease-in-out hover:text-white"
                        >
                            &times;
                        </span>
                        <h2 className="text-white text-xl mb-4">Create a Pin</h2>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded-[12px] p-10 text-center my-5 cursor-pointer transition-all duration-300 ease-in-out hover:border-[#06b6d4]"
                        >
                            <i className="fas fa-cloud-upload-alt text-5xl text-[#06b6d4] mb-4"></i>
                            <p className="text-[#a8a8a8]">Drag and drop your image here or click to browse</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="rounded-[12px] my-4 mx-auto max-w-[200px] max-h-[140px]"
                                />
                            )}
                        </div>

                        <input
                            type="text"
                            placeholder="Add a title"
                            value={pinTitle}
                            onChange={(e) => setPinTitle(e.target.value)}
                            className="w-full p-[14px] mb-4 rounded-lg border-none bg-[rgba(255,255,255,0.08)] text-white"
                        />

                        <textarea
                            placeholder="Add a description"
                            value={pinDesc}
                            onChange={(e) => setPinDesc(e.target.value)}
                            className="w-full p-[14px] mb-4 rounded-lg border-none h-[100px] resize-none bg-[rgba(255,255,255,0.08)] text-white"
                        ></textarea>

                        <button
                            onClick={handlePublish}
                            className="bg-[#06b6d4] text-white border-none py-[14px] px-5 rounded-[24px] w-full font-bold cursor-pointer transition-all duration-300 ease-in-out hover:bg-[rgb(24,139,216)]"
                        >
                            Publish
                        </button>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="w-[330px] h-20 rounded-lg box-border p-[10px_15px] bg-white shadow-[rgba(149,157,165,0.2)_0px_8px_24px] overflow-hidden flex items-center justify-around gap-[15px] fixed top-[10px] right-[10px] z-[99999999999999]">
                    <svg className="absolute rotate-90 left-[-31px] top-8 w-20 fill-[#fc0c0c3a]" viewBox="0 0 200 200">
                        <path d="M 0 50 Q 50 0 100 50 T 200 50" fill="currentColor" />
                    </svg>
                    <div className="w-[35px] h-[35px] flex justify-center items-center bg-[#fc0c0c48] rounded-full ml-2">
                        <i className="fas fa-check text-[#0bb7f0] text-[17px]"></i>
                    </div>
                    <div className="flex flex-col justify-center items-start flex-grow">
                        <p className="m-0 text-[#0bb7f0] text-sm font-bold">{toastMessage.title}</p>
                        <p className="m-0 text-sm text-[#555]">{toastMessage.desc}</p>
                    </div>
                    <i
                        onClick={() => setShowToast(false)}
                        className="fas fa-times text-[#555] text-[18px] cursor-pointer"
                    ></i>
                </div>
            )}

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            background-color: #06b6d4;
            box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
          }
          50% {
            transform: scale(1.2);
            background-color: #52d1e7;
            box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
          }
          100% {
            transform: scale(0.8);
            background-color: #06b6d4;
            box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
          }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </>
    );
};

export default MasonryGrid;