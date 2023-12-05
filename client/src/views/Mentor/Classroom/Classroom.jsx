import { React, useEffect, useState } from 'react';
import { Button, Tabs, Table, Popconfirm, message } from 'antd';
import './Classroom.less';


import NavBar from '../../../components/NavBar/NavBar';
import Roster from './Roster/Roster';
import Home from './Home/Home';
import SavedWorkSpaceTab from '../../../components/Tabs/SavedWorkspaceTab';
import LessonEditor from '../../ContentCreator/LessonEditor/LessonEditor';
import { useSearchParams, useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

import UnitCreator from '../../ContentCreator/UnitCreator/UnitCreator';
import LessonModuleActivityCreator from '../../ContentCreator/LessonModuleCreator/LessonModuleCreator'

import UnitEditor from '../../ContentCreator/UnitEditor/UnitEditor';

import {
  getLessonModuleAll,
  deleteLessonModule,
  getGrades,
} from '../../../Utils/requests';

import { QuestionCircleOutlined } from '@ant-design/icons';

export default function Classroom({
  handleLogout,
  selectedActivity,
  setSelectedActivity,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const tab = searchParams.get('tab');

  const viewing = searchParams.get('viewing');
  const [viewing2, setViewing2] = useState(parseInt(searchParams.get('activity')));
  const [page, setPage] = useState(
    searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
  );

  const navigate = useNavigate();

  const [gradeList, setGradeList] = useState([]);
  const [learningStandardList, setLessonModuleList] = useState([]);
  

  useEffect(() => {
    sessionStorage.setItem('classroomId', id);

    const fetchData = async () => {
      const [lsResponse, gradeResponse] = await Promise.all([
        getLessonModuleAll(),
        getGrades(),
      ]);
      setLessonModuleList(lsResponse.data);

      const grades = gradeResponse.data;
      grades.sort((a, b) => (a.id > b.id ? 1 : -1));
      setGradeList(grades);

    };
    fetchData();

  }, [id]);

  const columns = [
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <UnitEditor id={key.unit.id} unitName={key.unit.name} linkBtn={true} />
      ),
    },
    {
      title: 'Lesson',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <LessonEditor
          learningStandard={key}
          linkBtn={true}
          viewing={viewing2}
          setViewing={setViewing2}
          tab={tab}
          page={page}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'expectations',
      key: 'character',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      width: '10%',
      align: 'right',
      render: (_, key) => (
        <Popconfirm
          title={'Are you sure you want to delete this learning standard?'}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await deleteLessonModule(key.id);
            if (res.err) {
              message.error(res.err);
            } else {
              setLessonModuleList(
                learningStandardList.filter((ls) => {
                  return ls.id !== key.id;
                })
              );
              message.success('Delete success');
            }
          }}
        >
          <button id={'link-btn'}>Delete</button>
        </Popconfirm>
      ),
    },
  ];

  const filterLS = (grade) => {
    return learningStandardList.filter((learningStandard) => {
      return learningStandard.unit.grade === grade.id;
    });
  };

  const testGrade3 = {
    id: 1,
    name: '3rd',
  };

  const testGrade4 = {
    id: 3,
    name: '3rd',
  };

  const testGrade5 = {
    id: 4,
    name: '3rd',
  };

  const testGrade6 = {
    id: 5,
    name: '3rd',
  };

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
        <TabPane tab='Content Creator' key='content-creator'>
          <button className="styled-button" onClick={() => navigate('/ccdashboard')}>Navigate to Creator Dashboard</button>

          <div id='page-header'>
            <h1>Lessons & Units Overview</h1>
          </div>

          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <UnitCreator gradeList={gradeList} />
              <LessonModuleActivityCreator
                setLessonModuleList={setLessonModuleList}
                viewing={viewing2}
                setViewing={setViewing2}
                tab={tab}
                page={page}
              />
            </div>
            <Table
              columns={columns}
              dataSource={learningStandardList}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>

          <div id='page-header'>
            <h1>3rd Grade</h1>
          </div>



          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <div style={{ height: '30px' }}></div>
            </div>
            <Table
              columns={columns}
              dataSource={filterLS(testGrade3)} // FIX
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>
          
          <div id='page-header'>
            <h1>4th Grade</h1>
          </div>

          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <div style={{ height: '30px' }}></div>
            </div>
            <Table
              columns={columns}
              dataSource={filterLS(testGrade4)}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>

          <div id='page-header'>
            <h1>5th Grade</h1>
          </div>

          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <div style={{ height: '30px' }}></div>
            </div>
            <Table
              columns={columns}
              dataSource={filterLS(testGrade5)}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>

          <div id='page-header'>
            <h1>6th Grade</h1>
          </div>

          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
              <div style={{ height: '30px' }}></div>
            </div>
            <Table
              columns={columns}
              dataSource={filterLS(testGrade6)}
              rowClassName='editable-row'
              rowKey='id'
              onChange={(Pagination) => {
                setViewing(undefined);
                setPage(Pagination.current);
                setSearchParams({ tab, page: Pagination.current });
              }}
              pagination={{ current: page ? page : 1 }}
            ></Table>
          </div>
          
          
        </TabPane>
      </Tabs>
    </div>
  );
}
