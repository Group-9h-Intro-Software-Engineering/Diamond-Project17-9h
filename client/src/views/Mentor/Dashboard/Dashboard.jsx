import React, { useEffect, useState } from 'react';
import { getMentor, getClassrooms } from '../../../Utils/requests';
import { message } from 'antd';
import './Dashboard.less';
import DashboardDisplayCodeModal from './DashboardDisplayCodeModal';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../../components/NavBar/NavBar';
import { useGlobalState } from '../../../Utils/userState';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [value] = useGlobalState('currUser');
  const [isHelpVisible, setIsHelpVisible] = useState(false); // New state for help visibility
  const navigate = useNavigate();

  useEffect(() => {
    let classroomIds = [];
    getMentor().then((res) => {
      if (res.data) {
        res.data.classrooms.forEach((classroom) => {
          classroomIds.push(classroom.id);
        });
        getClassrooms(classroomIds).then((classrooms) => {
          setClassrooms(classrooms);
        });
      } else {
        message.error(res.err);
        navigate('/teacherlogin');
      }
    });
  }, []);

  const handleViewClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

  const handleHelpClick = () => {
    // Toggle the visibility of the help text box
    setIsHelpVisible(!isHelpVisible);
  };

  return (
    <div className='container nav-padding'>
      <NavBar onHelpClick={handleHelpClick} />
      <div id='main-header'>
        Welcome {value.name}
      </div>
      {/* Render the help text box based on the state */}
      <div id='help-textbox' className={isHelpVisible ? 'active' : ''}>
        {/* Add the close button */}
        <div id='close-button' onClick={() => setIsHelpVisible(false)}>X</div>
        {/* Add your help text content here */}
        <p>Welcome to CASMM! To get started, choose a classroom. {/* Your help text goes here */}</p>
        {/* Embed an image */}
      </div>
      
      <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>
      <div id='classrooms-container'>
        <div id='dashboard-card-container'>
          {classrooms.map((classroom) => (
            <div key={classroom.id} id='dashboard-class-card'>
              <div id='card-left-content-container'>
                <h1 id='card-title'>{classroom.name}</h1>
                <div id='card-button-container' className='flex flex-row'>
                  <button onClick={() => handleViewClassroom(classroom.id)}>
                    View
                  </button>
                </div>
              </div>
              <div id='card-right-content-container'>
                <DashboardDisplayCodeModal code={classroom.code} />
                <div id='divider' />
                <div id='student-number-container'>
                  <h1 id='number'>{classroom.students.length}</h1>
                  <p id='label'>Students</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
