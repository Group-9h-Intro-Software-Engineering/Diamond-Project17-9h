import { React, useEffect, useState } from 'react';
import { Tabs, Button } from 'antd';
import './Classroom.less';
import NavBar from '../../../components/NavBar/NavBar';
import Roster from './Roster/Roster';
import Home from './Home/Home';
import SavedWorkSpaceTab from '../../../components/Tabs/SavedWorkspaceTab';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

export default function Classroom({
  handleLogout,
  selectedActivity,
  setSelectedActivity,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHelpVisible, setIsHelpVisible] = useState(false); // New state for help visibility
  const { id } = useParams();
  const tab = searchParams.get('tab');
  const viewing = searchParams.get('viewing');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('classroomId', id);
  }, [id]);

  const handleHelpClick = () => {
    // Toggle the visibility of the help text box
    setIsHelpVisible(!isHelpVisible);
  };

  return (
    <div className='container nav-padding'>
      <NavBar isMentor={true} onHelpClick={handleHelpClick} />
      {/* Render the help text box based on the state */}
      <div id='help-textbox' className={isHelpVisible ? 'active' : ''}>
        {/* Add the close button */}
        <div id='close-button' onClick={() => setIsHelpVisible(false)}>
          X
        </div>
        {/* Add your help text content here */}
        <p>
          Welcome to your classroom. To view learning standards, click change. To see the activities within a learning standard, select the learning standard, then click review and set as active learning standard.{' '}
          {/* Your help text goes here */}
        </p>
        <p>To edit your activities, click the pencil icon, then edit student template.</p>
        {/* Embed an image */}
      </div>
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
      </Tabs>
      
      
    </div>
  );
}
