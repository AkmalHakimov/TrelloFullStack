import React, { useState,useEffect } from 'react';
import Rodal from 'rodal';
import axios from "axios"
import { Card,Button,Typography,Divider,Checkbox,List,Select, Space } from 'antd';
import { SettingOutlined, EditOutlined,EllipsisOutlined,DeleteOutlined  } from '@ant-design/icons';
import ApiCall from "../apiCall/ApiCall"

// include styles
import 'rodal/lib/rodal.css';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const { Title, Paragraph, Text, Link } = Typography;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const Trello = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [modalVisible,setModalVisible] = useState(false)
    const [userModal,setUserModal] = useState(false)
    const [currentItm,setCurrentItm] = useState("")
    const [users,setUsers] = useState([])
    const [tasks,setTasks]= useState([]);
    const [checkedUsers,setCheckedUsers]= useState([]);
    const [statusUsers,setStatusUsers]= useState([]);
    const [userTasks,setUserTasks]= useState([]);
    const [selectedTask,setSelectedTask]= useState("");
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        getTasks()
        getUsers()
        getUserTasks();
    }, []);

    function getTasks(){
        ApiCall("/api/task","GET",null).then(res=>{
            setTasks(res.data);
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        let obj = {
            title: event.target[0].value,
            desc: event.target[1].value
        }
        axios({
            url: "http://localhost:8080/api/task",
            method: "POST",
            data:obj
        }).then(res=>{
            setTasks(res.data);
            console.log(res.data)
        })
        document.forms[0].reset();
        setModalVisible(false)
    }

    function Del(id){
        ApiCall(`/api/task/${id}`,"DELETE",null).then(res=>{
            getTasks();
        })
    }

    function handeDrop(status){
        ApiCall(`/api/task/${currentItm}`,"PUT",{
            status
        }).then(res=>{
            getTasks();
        })
    }

    function handleUserSubmit(e){
        e.preventDefault();
    }

    function getUsers(){
        ApiCall("/api/user","get",null).then(res=>{
            setUsers(res.data)
        })
    }

    function handleChange(e,id){
        if (e.target.checked && !checkedUsers.includes(id)) {
            setCheckedUsers([...checkedUsers, id]);
          }
        
          if (!e.target.checked && checkedUsers.includes(id)) {
            setCheckedUsers(checkedUsers.filter((item) => item !== id));    
            setStatusUsers(statusUsers.filter(item=>item.id!==id))
          }
    }


    function handleSelect(value,id){
        let obj = {
            id,
            status: value
        }
        statusUsers.unshift(obj);
        setStatusUsers(statusUsers);
    }
    
    function assignUsers(){
        setUserModal(false)
        let data = [];
        for (let i = 0; i < checkedUsers.length; i++) {
            let obj = {
                id: checkedUsers[i],
                status: statusUsers.filter(item=>item.id===checkedUsers[i])[0]?statusUsers.filter(item=>item.id===checkedUsers[i])[0].status:null
            }
            data.push(obj);  
        }
        ApiCall(`/api/user/${selectedTask}`,"POST",data).then(res=>{
            getTasks()
            console.log("salom");
        })
    }

    function getUserTasks(){
        ApiCall("/api/user/task","GET").then(res=>{
            setUserTasks(res.data);
        })
    }
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}

                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>
                            <button onClick={async ()=> {
                                setModalVisible(true)
                            }} className={"btn btn-primary"}>Add Tasks</button>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className={"d-flex gap-3"}>
                            <Card
                                title="OPEN"
                                bordered={true}
                                headStyle={{borderBottom: "2px solid rgb(13,110,253)"}}
                                style={{
                                    width: 300,
                                    border: "2px solid rgb(13,110,253)"
                                }}
                                onDrop={()=>handeDrop("OPEN")}
                                onDragOver={(e)=>{e.preventDefault()}}
                            >
                                {
                                    tasks.length>0?tasks.filter(item1 => item1.status === "OPEN").map((item, index) => {
                                        return (
                                            <Card actions={[
                                                <EditOutlined onClick={()=>{setUserModal(true);setSelectedTask(item.id)}} key="edit"/>,
                                                <EllipsisOutlined key="ellipsis"/>,

                                            ]}
                                                  draggable = {true}
                                                  onDragStart={()=>setCurrentItm(item.id)}
                                                  extra={<Button onClick={()=>Del(item.id)} type="primary" icon={<DeleteOutlined/>}>

                                                  </Button>}
                                                  key={index} title={item.title}
                                                  headStyle={{borderBottom: "1px solid", padding: "0 8px"}}
                                                  style={{border: "1px solid black"}} className={"my-2"}>
                                                <h5>Task: {item.description}</h5>
                                            </Card>
                                        )
                                    })
                                        :(
                                            <p>No tasks found.</p>
                                        )
                                }
                            </Card>
                            <Card
                                title="INPROGRESS"
                                bordered={true}
                                headStyle={{borderBottom: "2px solid rgb(13,110,253)"}}
                                style={{
                                    width: 300,
                                    border: "2px solid rgb(13,110,253)"
                                }}
                                onDrop={()=>handeDrop("INPROGRESS")}
                                onDragOver={(e)=>{e.preventDefault()}}
                            >
                                {
                                    tasks.length>0?tasks.filter(item1 => item1.status === "INPROGRESS").map((item, index) => {
                                            return (
                                                <Card actions={[
                                                    <SettingOutlined key="setting"/>,
                                                    <EditOutlined key="edit"/>,
                                                    <EllipsisOutlined key="ellipsis"/>,

                                                ]}
                                                      draggable = {true}
                                                      onDragStart={()=>setCurrentItm(item.id)}
                                                      extra={<Button onClick={()=>Del(item.id)} type="primary" icon={<DeleteOutlined/>}>

                                                      </Button>}
                                                      key={index} title={item.title}
                                                      headStyle={{borderBottom: "1px solid", padding: "0 8px"}}
                                                      style={{border: "1px solid black"}} className={"my-2"}>
                                                    <h5>Task: {item.description}</h5>
                                                </Card>
                                            )
                                        })
                                        :(
                                            <p>No tasks found.</p>
                                        )
                                }
                            </Card>
                            <Card
                                title="TEST"
                                bordered={true}
                                headStyle={{borderBottom: "2px solid rgb(13,110,253)"}}
                                style={{
                                    width: 300,
                                    border: "2px solid rgb(13,110,253)"
                                }}
                                onDrop={()=>handeDrop("TEST")}
                                onDragOver={(e)=>{e.preventDefault()}}
                            >
                                {
                                    tasks.length>0?tasks.filter(item1 => item1.status === "TEST").map((item, index) => {
                                            return (
                                                <Card actions={[
                                                    <SettingOutlined key="setting"/>,
                                                    <EditOutlined key="edit"/>,
                                                    <EllipsisOutlined key="ellipsis"/>,

                                                ]}
                                                      draggable = {true}
                                                      onDragStart={()=>setCurrentItm(item.id)}
                                                      extra={<Button onClick={()=>Del(item.id)} type="primary" icon={<DeleteOutlined/>}>

                                                      </Button>}
                                                      key={index} title={item.title}
                                                      headStyle={{borderBottom: "1px solid", padding: "0 8px"}}
                                                      style={{border: "1px solid black"}} className={"my-2"}>
                                                    <h5>Task: {item.description}</h5>
                                                </Card>
                                            )
                                        })
                                        :(
                                            <p>No tasks found.</p>
                                        )
                                }
                            </Card>
                            <Card
                                title="COMPLETED"
                                bordered={true}
                                headStyle={{borderBottom: "2px solid rgb(13,110,253)"}}
                                style={{
                                    width: 300,
                                    border: "2px solid rgb(13,110,253)"
                                }}
                                onDrop={()=>handeDrop("COMPLETED")}
                                onDragOver={(e)=>{e.preventDefault()}}
                            >
                                {
                                    tasks.length>0?tasks.filter(item1 => item1.status === "COMPLETED").map((item, index) => {
                                            return (
                                                <Card actions={[
                                                    <SettingOutlined key="setting"/>,
                                                    <EditOutlined key="edit"/>,
                                                    <EllipsisOutlined key="ellipsis"/>,

                                                ]}
                                                      draggable = {true}
                                                      onDragStart={()=>setCurrentItm(item.id)}
                                                      extra={<Button onClick={()=>Del(item.id)} type="primary" icon={<DeleteOutlined/>}>

                                                      </Button>}
                                                      key={index} title={item.title}
                                                      headStyle={{borderBottom: "1px solid", padding: "0 8px"}}
                                                      style={{border: "1px solid black"}} className={"my-2"}>
                                                    <h5>Task: {item.description}</h5>
                                                </Card>
                                            )
                                        })
                                        :(
                                            <p>No tasks found.</p>
                                        )
                                }
                            </Card>
                        </div>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Akmal Khakimov ©{new Date().getFullYear()}
                </Footer>
            </Layout>
            <Rodal visible={modalVisible} onClose={()=>setModalVisible(false)}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input placeholder={"title"} type="text" className={"form-control my-4"} />
                        <input placeholder={"description"} type="text" className={"form-control my-2"} />
                        <button className={"btn btn-primary"} style={{marginLeft: "310px"}}>Save</button>
                    </form>
                </div>
            </Rodal>
            <Rodal width={700} height={430} visible={userModal} onClose={()=>setUserModal(false)}>
                <div>
                    <div >
                        <Paragraph  className={"my-4"}>
                            <List
                                size="large"
                                header={<h3>Users</h3>}
                                footer={<div><Button onClick={assignUsers} style={{marginLeft:"540px"}} type={"primary"}>Assign</Button></div>}
                                bordered
                                dataSource={users}

                                renderItem={(item) => <List.Item style={{height: "50px"}}>
                                    <Checkbox checked={userTasks.filter(item1=>item1.user.id===item.id).length!==0?true:false} onChange={(event)=>handleChange(event,item.id)}><h5 style={{fontSize: "20px"}}>{item.name}</h5></Checkbox>
                                    <Space wrap>
    <Select
      defaultValue="select value"
      style={{
        width: 120,
      }}
      disabled={!checkedUsers.includes(item.id) || userTasks.filter(item1=>item1.user.id===item.id).length===0}
      onChange={(e)=>handleSelect(e,item.id)}
      options={[
        {
          value: 'FRONT',
          label: 'Frontend',
        },
        {
          value: 'BACK',
          label: 'Backend',
        },
        {
          value: 'TEST',
          label: 'Test',
        },
      ]}
    />
     </Space>
                                    </List.Item>}
                            />
                        </Paragraph>
                    </div>
                </div>
            </Rodal>
        </Layout>

    );
};
export default Trello;