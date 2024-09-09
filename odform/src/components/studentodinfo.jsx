import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import '../css/studentodinfo.css';
import { Link } from 'react-router-dom';

function OnDutyForm() {
    const [email, setEmail] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [presentYear, setPresentYear] = useState('');
    const [odType, setOdType] = useState('');
    const [id, setid] = useState('');
    const [reason, setReason] = useState('');
    const [appliedDate, setAppliedDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [relatedTo, setRelatedTo] = useState('');
    const [totalDays, setTotalDays] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [notification, setNotification] = useState('');
    
    const specificAppliedDate = new Date().toISOString().split('T')[0];
    const [internalDaysLimit, setInternalDaysLimit] = useState(0);
    const [externalDaysLimit, setExternalDaysLimit] = useState(0);
    const [internalDaysHistory, setInternalDaysHistory] = useState(0);
    const [externalDaysHistory, setExternalDaysHistory] = useState(0);

    useEffect(() => {
        setInternalDaysLimit(10); 
        setExternalDaysLimit(15); 
        setInternalDaysHistory(2); 
        setExternalDaysHistory(3); 
    }, []);
  useEffect(()=>{
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
        const userData = JSON.parse(storedData);
        setEmail(userData.email);
        setName(userData.name);
        setClassName(userData.classs);
        setSection(userData.section);
        setPresentYear(userData.year);
        setid(userData.id);
        setRollNo(userData.rollno);

    }
  },[])
    useEffect(() => {
        if (startDate && endDate) {
            calculateDaysBetweenDates();
        }
    }, [startDate, endDate, odType]);

    const calculateDaysBetweenDates = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        if (start > end) {
            console.log('End Date cannot be before Start Date.');
            setErrorMessage('End Date cannot be before Start Date.');
            setTotalDays('');
            setNotification('');
            return false;
        }
    
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    
        if (odType === 'internal' && diffDays + internalDaysHistory > internalDaysLimit) {
            const remainingDays = internalDaysLimit - internalDaysHistory;
            setNotification(`Exceeded allowed Internal OD days. Limit is ${internalDaysLimit}. You have already taken ${internalDaysHistory} days. You can take only ${remainingDays > 0 ? remainingDays : 0} more days.`);
            setErrorMessage('');
            setTotalDays('');
            return false;
        } else if (odType === 'external' && diffDays + externalDaysHistory > externalDaysLimit) {
            const remainingDays = externalDaysLimit - externalDaysHistory;
            setNotification(`Exceeded allowed External OD days. Limit is ${externalDaysLimit}. You have already taken ${externalDaysHistory} days. You can take only ${remainingDays > 0 ? remainingDays : 0} more days.`);
            setErrorMessage('');
            setTotalDays('');
            return false;
        } else {
            setNotification('');
            setErrorMessage('');
            setTotalDays(diffDays);
            return true;
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!calculateDaysBetweenDates()) {
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('rollno', rollNo);
        formData.append('name', name);
        formData.append('classs', className);
        formData.append('section', section);
        formData.append('presentyear', presentYear);
        formData.append('odtype', odType);
        formData.append('reason', reason);
        formData.append('applieddate', appliedDate);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('related_to', relatedTo);
        formData.append('total_days', totalDays);
        formData.append('id', id);
        formData.append("year",presentYear)
        const photoFile = document.getElementById('photo').files[0];
        const pdfFile = document.getElementById('pdf').files[0];
        formData.append('photo', photoFile);
        formData.append('pdf', pdfFile);
        
        
        try {
            console.log("hellllllll")
            const response = await axios.post('http://localhost:4000/studenthome1', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              
            alert(response.data); 
            window.location.href = '/studenthome';
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="top-right">
                <Link to="/studenthome" className="button back-to-home">Home</Link>
            </div>
            <h1>On-Duty Form</h1>
            <form id="od-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" id="internal-days" value={internalDaysLimit} />
                <input type="hidden" id="external-days" value={externalDaysLimit} />
                <input type="hidden" id="internal-history" value={internalDaysHistory} />
                <input type="hidden" id="external-history" value={externalDaysHistory} />

                <div id="notification-bar" style={{ display: notification ? 'block' : 'none' }}>
                    {notification}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="rollno">Roll Number:</label>
                    <input type="text" id="rollno" name="rollno" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="class">Class:</label>
                    <input type="text" id="class" name="class" value={className} onChange={(e) => setClassName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="section">Section:</label>
                    <input type="text" id="section" name="section" value={section} onChange={(e) => setSection(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="presentYear">Present Year of Study:</label>
                    <input type="text" id="presentYear" name="presentYear" value={presentYear} onChange={(e) => setPresentYear(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="odtype">OD Type:</label>
                    <select id="odtype" name="odtype" value={odType} onChange={(e) => setOdType(e.target.value)} required>
                        <option value="" disabled>Select OD Type</option>
                        <option value="internal">Internal OD</option>
                        <option value="external">External OD</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason for OD:</label>
                    <input type="text" id="reason" name="reason" value={reason} onChange={(e) => setReason(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Upload Photo proof:</label>
                    <input type="file" id="photo" name="photo" required />
                </div>
                <div className="form-group">
                    <label htmlFor="pdf">Upload PDF proof:</label>
                    <input type="file" id="pdf" name="pdf" required />
                </div>
                <div className="form-group">
                    <label htmlFor="applied-date">Applied Date:</label>
                    <input type="date" id="applied-date" name="applieddate" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} min={specificAppliedDate} max={specificAppliedDate} required />
                </div>
                <div className="form-group">
                    <label htmlFor="start-date">Start Date:</label>
                    <input type="date" id="start-date" name="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="end-date">End Date:</label>
                    <input type="date" id="end-date" name="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="related-to">Related to:</label>
                    <input type="text" id="related-to" name="related_to" value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="total-days">Total Days:</label>
                    <input type="text" id="total-days" name="total_days" value={totalDays} readOnly />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
                <div id="error-message" style={{ color: 'red' }}>
                    {errorMessage}
                </div>
            </form>
        </div>
    );
}

export default OnDutyForm;
