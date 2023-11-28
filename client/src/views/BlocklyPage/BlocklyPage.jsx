import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlocklyCanvasPanel from '../../components/ActivityPanels/BlocklyCanvasPanel/BlocklyCanvasPanel';
import NavBar from '../../components/NavBar/NavBar';
import { getAuthorizedWorkspaceToolbox, getActivityToolbox, getActivityToolboxAll } from '../../Utils/requests';
import { useGlobalState } from '../../Utils/userState';

export default function BlocklyPage({ isSandbox }) {
  const [value] = useGlobalState('currUser');
  const [activity, setActivity] = useState({});
  const [isHelpVisible, setIsHelpVisible] = useState(false); // New state for help visibility
  const navigate = useNavigate();

  useEffect(() => {
    const setup = async () => {
      // if we are in sandbox mode show all toolbox
      const sandboxActivity = JSON.parse(localStorage.getItem("sandbox-activity"))
      if (isSandbox) {
        const AllToolboxRes = await getActivityToolboxAll()
        if (!sandboxActivity?.id || value.role === "Mentor") {
          if (AllToolboxRes.data) {
            let loadedActivity = {
              ...sandboxActivity,
              toolbox: AllToolboxRes.data.toolbox,
            }
            localStorage.setItem("sandbox-activity", JSON.stringify(loadedActivity))
            setActivity(loadedActivity)
          } else {
            message.error(AllToolboxRes.err)
          }
        } else if (value.role === "ContentCreator") {
          const res = await getAuthorizedWorkspaceToolbox(sandboxActivity.id)
          if (res.data) {
            let loadedActivity = { ...sandboxActivity, selectedToolbox: res.data.toolbox }
            loadedActivity = { ...loadedActivity, toolbox: AllToolboxRes.data.toolbox }

            localStorage.setItem("sandbox-activity", JSON.stringify(loadedActivity))
            setActivity(loadedActivity)
          } else {
            message.error(res.err)
          }
        }
      }
      // else show toolbox based on the activity we are viewing
      else {
        const localActivity = JSON.parse(localStorage.getItem("my-activity"))

        if (localActivity) {
          if (localActivity.toolbox) {
            setActivity(localActivity)
          } else {
            const res = await getActivityToolbox(localActivity.id)
            if (res.data) {
              let loadedActivity = { ...localActivity, toolbox: res.data.toolbox }

              localStorage.setItem("my-activity", JSON.stringify(loadedActivity))
              setActivity(loadedActivity)
            } else {
              message.error(res.err)
            }
          }
        } else {
          navigate(-1)
        }
      }
    }

    setup()
  }, [isSandbox, navigate, value.role])

  const handleHelpClick = () => {
    // Toggle the visibility of the help text box
    setIsHelpVisible(!isHelpVisible);
  };

  return (
    <div className='container nav-padding'>
      {/* Pass the handleHelpClick function to the NavBar */}
      <NavBar onHelpClick={handleHelpClick} />
      {/* Render the help text box based on the state */}
      <div id='help-textbox' className={isHelpVisible ? 'active' : ''}>
        {/* Add the close button */}
        <div id='close-button' onClick={() => setIsHelpVisible(false)}>
          X
        </div>
        {/* Add your help text content here */}
        <p>
          This is the activity editor. Once you have created your activities, you can edit and save the changes here. To save your changes to the activity, click Save to template. Changes are also saved automatically.{/* Your help text goes here */}
        </p>
        {/* Embed an image */}
      </div>
      <div className='flex flex-row'>
        <BlocklyCanvasPanel activity={activity} setActivity={setActivity} isSandbox={isSandbox} />
      </div>
    </div>
  );
}