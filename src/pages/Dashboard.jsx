import React, { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserGraduate, FaVenusMars, FaLayerGroup, FaCalendarAlt } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [totalLaki, setTotalLaki] = useState(0);
    const [totalPerempuan, setTotalPerempuan] = useState(0);
    const [totalJurusan, setTotalJurusan] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://oman.rikpetik.site/api/v1/pendaftar");
                const result = await res.json();
                const storedData = result.data || [];

                setData(storedData);
                setLastUpdated(new Date().toLocaleString()); // Menyimpan waktu pembaruan data

                const laki = storedData.filter(item => item.jenis_kelamin === "Laki-laki").length;
                const perempuan = storedData.filter(item => item.jenis_kelamin === "Perempuan").length;
                const jurusanUnik = new Set(storedData.map(item => item.jurusan)).size;

                setTotalLaki(laki);
                setTotalPerempuan(perempuan);
                setTotalJurusan(jurusanUnik);
            } catch (error) {
                console.error("Gagal ambil data:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    const genderData = {
        labels: ['Laki-laki', 'Perempuan'],
        datasets: [
            {
                label: 'Jumlah Pendaftar',
                data: [totalLaki, totalPerempuan],
                backgroundColor: ['#4e73df', '#1cc88a'],
            },
        ],
    };

    return (
        <Layout>
            <div className="container py-4">
                <h5 className="text-center fw-bold mb-4">Dashboard Pendaftaran</h5>

                {isLoading ? (
                    <div className="text-center">Sedang memuat data...</div>
                ) : isError ? (
                    <div className="text-center text-danger">Gagal mengambil data!</div>
                ) : data.length === 0 ? (
                    <div className="alert alert-warning text-center">Belum ada data pendaftar.</div>
                ) : (
                    <div>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-muted">Total Pendaftar</h6>
                                        <h3 className="fw-bold">{data.length}</h3>
                                    </div>
                                    <div className="bg-primary text-white p-3 rounded">
                                        <FaUserGraduate className="fs-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-muted">Laki-laki / Perempuan</h6>
                                        <h3 className="fw-bold">{totalLaki} / {totalPerempuan}</h3>
                                    </div>
                                    <div className="bg-success text-white p-3 rounded">
                                        <FaVenusMars className="fs-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-muted">Jumlah Jurusan</h6>
                                        <h3 className="fw-bold">{totalJurusan}</h3>
                                    </div>
                                    <div className="bg-warning text-white p-3 rounded">
                                        <FaLayerGroup className="fs-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h6 className="text-muted text-center">Perbandingan Laki-laki vs Perempuan</h6>
                            <Bar data={genderData} options={{ responsive: true }} />
                        </div>

                        <div className="text-center mt-4">
                            <h6 className="text-muted">Pembaruan Terakhir</h6>
                            <p>{lastUpdated}</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
