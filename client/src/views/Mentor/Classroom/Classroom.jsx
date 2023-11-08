import { React, useEffect } from 'react';
import { Button, Tabs } from 'antd';
import './Classroom.less';


import NavBar from '../../../components/NavBar/NavBar';
import Roster from './Roster/Roster';
import Home from './Home/Home';
import SavedWorkSpaceTab from '../../../components/Tabs/SavedWorkspaceTab';
import LessonEditor from '../../ContentCreator/LessonEditor/LessonEditor';
import { useSearchParams, useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

export default function Classroom({
  handleLogout,
  selectedActivity,
  setSelectedActivity,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const tab = searchParams.get('tab');
  const viewing = searchParams.get('viewing');

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('classroomId', id);

  }, [id]);

  return (
    <div className='container nav-padding'>
      <NavBar isMentor={true} />
      <Tabs
        defaultActiveKey={tab ? tab : 'home'}
        onChange={(key) => setSearchParams({ tab: key })}
      >
        <TabPane tab='Home' key='home'>
          <Home
            classroomId={parseInt(id)}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            viewing={viewing}
          />
        </TabPane>
        <TabPane tab='Roster' key='roster'>
          <Roster handleLogout={handleLogout} classroomId={id} />
        </TabPane>
        <TabPane tab='Saved Workspaces' key='workspace'>
          <SavedWorkSpaceTab
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            classroomId={id}
          />
        </TabPane>
        {/* Adding new tab to access lesson editor */}
        <TabPane tab='Lesson Editor' key='lesson editor'>
          <button className="styled-button" onClick={() => navigate('/ccdashboard')}>Navigate to Creator Dashboard</button>
        </TabPane>
      </Tabs>
    </div>
  );
}
