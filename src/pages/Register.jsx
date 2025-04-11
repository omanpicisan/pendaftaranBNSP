import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form, Card, Row, Col, Alert } from 'react-bootstrap';

const Pendaftaran = () => {
  const [pendaftar, setPendaftar] = useState([]);
  const [formData, setFormData] = useState({
    nm_pendaftar: '',
    alamat: '',
    jenis_kelamin: '',
    no_hp: '',
    asal_sekolah: '',
    jurusan: '',
    tgl_lahir: '',
    nisn: '',
  });
  const [editingId, setEditingId] = useState(null);

  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('https://oman.rikpetik.site/api/v1/pendaftar');
      setPendaftar(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error('Gagal fetch data:', err);
      showAlert('Gagal memuat data dari server.', 'danger');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nm_pendaftar || !formData.jenis_kelamin) {
      showAlert('Nama dan Jenis Kelamin wajib diisi!', 'warning');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`https://oman.rikpetik.site/api/v1/pendaftar/update/${editingId}`, formData);
        showAlert('Data berhasil diperbarui!', 'success');
      } else {
        await axios.post('https://oman.rikpetik.site/api/v1/pendaftar/create', formData);
        showAlert('Data berhasil ditambahkan!', 'success');
      }

      fetchData();
      setFormData({
        nm_pendaftar: '',
        alamat: '',
        jenis_kelamin: '',
        no_hp: '',
        asal_sekolah: '',
        jurusan: '',
        tgl_lahir: '',
        nisn: '',
      });
      setEditingId(null);
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
      showAlert('Terjadi kesalahan saat menyimpan data.', 'danger');
    }
  };

  const handleEdit = (data) => {
    setFormData({
      nm_pendaftar: data.nm_pendaftar || '',
      alamat: data.alamat || '',
      jenis_kelamin: data.jenis_kelamin || '',
      no_hp: data.no_hp || '',
      asal_sekolah: data.asal_sekolah || '',
      jurusan: data.jurusan || '',
      tgl_lahir: data.tgl_lahir || '',
      nisn: data.nisn || '',
    });
    setEditingId(data.id_pendaftar);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`https://oman.rikpetik.site/api/v1/pendaftar/delete/${id}`);
        showAlert('Data berhasil dihapus!', 'success');
        fetchData();
      } catch (err) {
        console.error('Delete error:', err);
        showAlert('Gagal menghapus data.', 'danger');
      }
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Formulir Pendaftaran Siswa</h3>

      {/* Alert */}
      {alert.show && (
        <Alert variant={alert.variant} className="text-center">
          {alert.message}
        </Alert>
      )}

      {/* Form Pendaftaran */}
      <Card className="mb-4 shadow border-0">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              {[
                { label: 'Nama Lengkap', name: 'nm_pendaftar' },
                { label: 'Alamat', name: 'alamat' },
                { label: 'No HP', name: 'no_hp' },
                { label: 'Asal Sekolah', name: 'asal_sekolah' },
                { label: 'Jurusan', name: 'jurusan' },
                { label: 'NISN', name: 'nisn' },
              ].map((field, idx) => (
                <Col md={6} key={idx}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                </Col>
              ))}
              <Col md={6}>
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  name="tgl_lahir"
                  value={formData.tgl_lahir}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <div className="text-end mt-4">
              <Button type="submit" variant="success" className="px-4">
                {editingId ? 'Update Data' : 'Daftar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Tabel Data */}
      <Card className="shadow border-0">
        <Card.Header className="bg-light">
          <strong>Data Pendaftar</strong>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover>
            <thead className="table-light text-center">
              <tr>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Jenis Kelamin</th>
                <th>No HP</th>
                <th>Asal Sekolah</th>
                <th>Jurusan</th>
                <th>Tgl Lahir</th>
                <th>NISN</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center align-middle">
              {pendaftar.length > 0 ? (
                pendaftar.map((item) => (
                  <tr key={item.id_pendaftar}>
                    <td>{item.nm_pendaftar}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jenis_kelamin}</td>
                    <td>{item.no_hp}</td>
                    <td>{item.asal_sekolah}</td>
                    <td>{item.jurusan}</td>
                    <td>{item.tgl_lahir}</td>
                    <td>{item.nisn}</td>
                    <td>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(item.id_pendaftar)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">Belum ada data.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Pendaftaran;
