import React, { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBookOpen, FaListOl, FaHeart, FaSearch } from "react-icons/fa";

const Dashboard = () => {
    const [search, setSearch] = useState("");
    const [surahList, setSurahList] = useState([]);
    const [filteredSurah, setFilteredSurah] = useState([]);

    // Fetch data dari API Al-Qur'an
    useEffect(() => {
        fetch("https://api.alquran.cloud/v1/surah")
            .then((response) => response.json())
            .then((data) => {
                setSurahList(data.data);
                setFilteredSurah(data.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Handle pencarian surah
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearch(query);
        const filtered = surahList.filter(
            (surah) =>
                surah.englishName.toLowerCase().includes(query) ||
                surah.number.toString().includes(query)
        );
        setFilteredSurah(filtered);
    };

    return (
        <Layout>
            <div className="container py-4">
                {/* Header Dashboard */}
                <h5 className="text-center text-success fw-bold mb-4">Dashboard</h5>

                {/* Form Pencarian */}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Cari surah berdasarkan nama atau nomor..." 
                                value={search}
                                onChange={handleSearch}
                            />
                            <button className="btn btn-success">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid Statistik */}
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted">Total Surah</h6>
                                <h3 className="fw-bold">114</h3>
                            </div>
                            <div className="bg-primary text-white p-3 rounded">
                                <FaBookOpen className="fs-4" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted">Total Ayat</h6>
                                <h3 className="fw-bold">6,236</h3>
                            </div>
                            <div className="bg-success text-white p-3 rounded">
                                <FaListOl className="fs-4" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted">Favorit</h6>
                                <h3 className="fw-bold">10</h3>
                            </div>
                            <div className="bg-danger text-white p-3 rounded">
                                <FaHeart className="fs-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hasil Pencarian Surah */}
                <div className="mt-5">
                    <h5 className="fw-bold mb-3">Hasil Pencarian</h5>
                    <div className="list-group">
                        {filteredSurah.length > 0 ? (
                            filteredSurah.map((surah) => (
                                <button key={surah.number} className="list-group-item list-group-item-action">
                                    {surah.number}. {surah.englishName} ({surah.englishNameTranslation})
                                </button>
                            ))
                        ) : (
                            <p className="text-muted">Surah tidak ditemukan.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
