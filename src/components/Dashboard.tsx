import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NasaImageData {
    album: string[];
    description: string;
    title: string;
    photographer: string;
    location: string;
    nasa_id: string;
    date_created: string;
    keywords: string[];
    media_type: string;
    center: string;
}

interface NasaImageLink {
    href: string;
    rel: string;
    render: string;
}

interface NasaImageItem {
    href: string;
    data: NasaImageData[];
    links: NasaImageLink[];
}
interface NasaItem {
    data: {
        nasa_id: string;
        title: string;
        description: string;
        photographer: string;
        location: string;
        date_created: string;
        keywords: string[];
    }[];
    links: {
        href: string;
    }[];
    href: string;
};
interface NasaApiResponse {
    data: NasaImageItem[];
    status: number;
    total_count: number;
    page: number;
    page_size: number;
}

const Dashboard = () => {
    const [data, setData] = useState<NasaImageItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState<NasaItem | any>(null);
    const [filters, setFilters] = useState({
        title: '',
        mediaType: '',
        yearStartDate: '',
        yearEndDate: '',
    });

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        const payload = {
            ...filters,
            page: currentPage,
            page_size: 10,
            cache: true
        };

        try {
            let User = sessionStorage.getItem('User') || ''
            const token = JSON.parse(User)
            if (token.accessToken) {
                const response = await axios.post<NasaApiResponse>('http://localhost:8080/api/SearchNasaImage', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.accessToken}`
                    }
                });
                setData(response.data.data);
            }
        } catch (error: any) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    const handleImageClick = (item: NasaItem) => {
        console.log(item.links[0].href);
        const largeImageUrl = item.links[0].href.replace('~thumb', '~large');
        setSelectedImage({ ...item, largeImageUrl });
        // setSelectedImage(item);
        console.log(largeImageUrl, '------selected jasdjcjhjd');

    };

    const handleClosePopup = () => {
        setSelectedImage(null);
    };
    // useEffect(() => {
    //     fetchData();
    // }, [filters,currentPage]);
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSearch = () => {
        fetchData(); // Trigger fetching data when search button is clicked
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
        fetchData();

    };

    // Function to handle "Next" button click
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        fetchData();
    };
    return (
        <div className="flex">
            <div className="navbar w-1/4 p-4 bg-gray-100">
                <h1 className="text-xl font-bold mb-4">NASA Image Search</h1>
                <div className="search-container space-y-4">
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={filters.title}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label>Media Type:</label>
                        <select
                            name="mediaType"
                            value={filters.mediaType}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">All</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                    <div>
                        <label>Start Year:</label>
                        <select
                            name="yearStartDate"
                            value={filters.yearStartDate}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Year</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                    <div>
                        <label>End Year:</label>
                        <select
                            name="yearEndDate"
                            value={filters.yearEndDate}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Year</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="w-3/4 p-4">
                <div className="flex justify-between my-4">
                    <button className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleNextPage}>Next</button>
                </div>
                {data.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {data.map(item => (
                            <div key={item.data[0].nasa_id}>
                                <h2 className="text-2xl font-bold mb-2">{item.data[0].title}</h2>
                                <img src={item.links[0].href} alt={item.data[0].title} className="w-full mb-2" onClick={() => handleImageClick(item)} />
                                {/* <p><strong>Photographer:</strong> {item.data[0].photographer}</p>
                                <p><strong>Location:</strong> {item.data[0].location}</p>
                                <p><strong>Date Created:</strong> {item.data[0].date_created}</p>
                                <p><strong>Keywords:</strong> {item.data[0].keywords.join(', ')}</p> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results found.</p>
                )}

                {selectedImage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                        <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full max-h-screen overflow-auto relative">
                            <button
                                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                                onClick={handleClosePopup}
                            >
                                &times;
                            </button>
                            <img src={selectedImage.largeImageUrl} alt={selectedImage.data[0].title} className="w-full mb-4" />
                            <h2 className="text-2xl font-bold mb-2">{selectedImage.data[0].title}</h2>
                            <p>{selectedImage.data[0].description}</p>
                            <p><strong>Photographer:</strong> {selectedImage.data[0].photographer}</p>
                            <p><strong>Location:</strong> {selectedImage.data[0].location}</p>
                            <p><strong>Date Created:</strong> {selectedImage.data[0].date_created}</p>
                            <p><strong>Keywords:</strong> {selectedImage.data[0].keywords.join(', ')}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;