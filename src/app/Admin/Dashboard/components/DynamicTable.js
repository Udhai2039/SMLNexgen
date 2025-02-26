'use client';
import React, { useState, useEffect } from 'react';
import styles from './DynamicTable.module.css';

const DynamicTable = ({ dataType }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE_URL = 'http://192.168.0.197:5000';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = dataType === 'contact' ? '/api/contact' : '/api/book-service';
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
        setFilteredData(result);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error details:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (dataType) {
      fetchData();
    }
  }, [dataType]);

  useEffect(() => {
    const filtered = data.filter(item =>
      Object.values(item)
        .map(value => (value || '').toString().toLowerCase())
        .some(value => value.includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const getHeaders = () => {
    if (dataType === 'contact') {
      return [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Message', key: 'message' },
        { label: 'Actions', key: null }, // Add Actions column
      ];
    } else if (dataType === 'booking') {
      return [
        { label: 'Name', key: 'fullName' },
        { label: 'Email', key: 'email' },
        { label: 'Number', key: 'phoneNumber' },
        { label: 'Date&Time', key: 'dateTime' },
        { label: 'Reason', key: 'reason' },
        { label: 'Service', key: 'selectedService' },
        { label: 'Actions', key: null }, // Add Actions column
      ];
    }
    return [];
  };

  const sortData = (key) => {
    if (!key) return; // Skip sorting for Actions column
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  const exportToCSV = () => {
    const headers = getHeaders().map(h => h.label).slice(0, -1); // Exclude Actions
    const csvRows = [
      headers.join(','),
      ...filteredData.map(item =>
        getHeaders()
          .slice(0, -1) // Exclude Actions
          .map(h => `"${(item[h.key] || '').toString().replace(/"/g, '""')}"`)
          .join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataType}-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (index) => {
    if (!confirm(`Are you sure you want to delete this ${dataType}?`)) return;
    try {
      const endpoint = dataType === 'contact' ? '/api/contact' : '/api/book-service';
      const response = await fetch(`${API_BASE_URL}${endpoint}/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }
      // Update local state after successful deletion
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      setFilteredData(newData.filter(item =>
        Object.values(item)
          .map(value => (value || '').toString().toLowerCase())
          .some(value => value.includes(searchTerm.toLowerCase()))
      ));
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    }
  };

  const renderRow = (item, index) => {
    if (dataType === 'contact') {
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.message}</td>
          <td>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    } else if (dataType === 'booking') {
      return (
        <tr key={index}>
          <td>{item.fullName}</td>
          <td>{item.email}</td>
          <td>{item.phoneNumber}</td>
          <td>{item.dateTime}</td>
          <td>{item.reason}</td>
          <td>{item.selectedService}</td>
          <td>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
    return null;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dynamicTableContainer}>
      <div className={styles.tableHeader}>
        <h2>{dataType === 'contact' ? 'Contact List' : 'Booking List'}</h2>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder={`Search ${dataType === 'contact' ? 'contacts' : 'bookings'}...`}
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <button className={styles.exportButton} onClick={exportToCSV}>
            Export to CSV
          </button>
        </div>
      </div>
      <table className={styles.dynamicTable}>
        <thead>
          <tr>
            {getHeaders().map((header, idx) => (
              <th
                key={idx}
                onClick={() => sortData(header.key)}
                className={`${styles.sortable} ${
                  sortConfig.key === header.key ? styles[sortConfig.direction] : ''
                }`}
              >
                {header.label}
                {sortConfig.key === header.key && (
                  <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={getHeaders().length}>
                No {dataType} available{searchTerm ? ' for this search' : ''}
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => renderRow(item, index))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;