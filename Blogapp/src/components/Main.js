import React, { Component } from "react";
import { Stack, Box } from "@chakra-ui/core";
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookie from "js-cookie";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import DbForm from "./DbForm";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Submit from "./Submit";
import PostDetails from "./PostDetails";
import Search from "./search";
import Posts from "./posts";
import DbFormUpdate from "./DBFormUpdate";
import Header1 from "./Header1";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData:[
        {userid:1,userName:"pawan",userMail:"pawan@gmail.com",accType:"superadmin"},
        {userid:1,userName:"admin",userMail:"pawan@gmail.com",accType:"admin"}
      ],
      data:[
        {userId:1,username:"pawan",postName:"nature",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum gravida risus ut imperdiet. Nunc neque justo, iaculis eget nulla non, viverra dignissim nibh. Donec varius sodales urna convallis consequat.",date:"20 January, 2019 at 2:00 PM "},
        {userId:1,username:"kalyan",postName:"wild",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum gravida risus ut imperdiet. Nunc neque justo, iaculis eget nulla non, viverra dignissim nibh. Donec varius sodales urna convallis consequat.",date:"20 January, 2019 at 2:00 PM "},
        {userId:1,username:"nithin",postName:"forest",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum gravida risus ut imperdiet. Nunc neque justo, iaculis eget nulla non, viverra dignissim nibh. Donec varius sodales urna convallis consequat.",date:"20 January, 2019 at 2:00 PM "},
        {userId:1,username:"raj",postName:"animal",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum gravida risus ut imperdiet. Nunc neque justo, iaculis eget nulla non, viverra dignissim nibh. Donec varius sodales urna convallis consequat.",date:"20 January, 2019 at 2:00 PM "},
      ],
      data1:[
        {userId:1,username:"pawan",postName:"nature",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum gravida risus ut imperdiet. Nunc neque justo, iaculis eget nulla non, viverra dignissim nibh. Donec varius sodales urna convallis consequat.",date:"20 January, 2019 at 2:00 PM ",approved: true},
        {userId:1,username:"kalyan",postName:"wild",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum gravida risus ut imperdiet. Nunc neque justo, iaculis eget nulla non, viverra dignissim nibh. Donec varius sodales urna convallis consequat.",date:"20 January, 2019 at 2:00 PM ",approved: false},
        {userId:1,username:"nithin",postName:"forest",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum gravida risus ut imperdiet. Nunc neque justo, iaculis eget nulla non, viverra dignissim nibh. Donec varius sodales urna convallis consequat.",date:"20 January, 2019 at 2:00 PM "},
        {userId:1,username:"raj",postName:"animal",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum gravida risus ut imperdiet. Nunc neque justo, iaculis eget nulla non, viverra dignissim nibh. Donec varius sodales urna convallis consequat.",date:"20 January, 2019 at 2:00 PM "},
      ],
      search: "",
      search1: true,      
      log: false,      
    }
  };

  componentDidMount() {
    if(Cookie.get("userData")!=undefined)
      this.getData();
  }

  
  logStatus=()=>{
    this.setState({ log: true },()=>console.log(this.state.log));
  }
  
  onRefresh=()=>{
    this.getData()
  }

  getData(){
    console.log('///////////////////')
    let data = JSON.parse(Cookie.get("userData"))
    console.log(data)

    Axios.post("http://localhost:8080/posts",{acctype:data.accType,username: data.userName})
    .then((res)=>{
      console.log(res.data,'posts from back')
      this.setState({data:res.data})
      console.log(this.state.data)

    })
    .catch((err)=>console.log(err,'--------->'))
  }
  getData1(arr){
    this.setState({data:arr})
  }
  changeHandle = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  onLogout = () => {
    // this.setState({log : false},()=>{
      Cookie.remove("userData");
      window.location.replace("/")

    // });
  };
  searchEvent = (event) => {
    this.setState({ search: event.target.value }, () => {
      if (this.state.search.length > 0) {
        let arr1 = this.state.data.filter((ele) =>
          ele.title.toLowerCase().startsWith(this.state.search.toLowerCase())
        );
        let arr = [...arr1];
        var resArr = [];
        arr.forEach(function (item) {
          var i = resArr.findIndex((x) => x.id === item.id);
          if (i <= -1) {
            resArr.push(item);
          }
        });
        this.setState(
          {
            search1: false,
          },
          () => this.getData1(resArr)
        );
      } else {
        this.setState({ search1: true });
        this.getData();
      }
    });
  };
  render() {
    return (
      <Box>
        <Stack spacing={8}>
          <Router>
            <Switch>
            <Route exact path="/register">
            <Header1 />
              <Register />
            </Route>
              <Route exact path="/">
              <Header1 />
                <Login state={this.state} logStatus={this.logStatus} onRefresh = {this.onRefresh}/>
              </Route>
              <Route exact path="/bulletin">
              {this.state.log||Cookie.get("userData")!==undefined?
              <div>
              <Header onLogout={this.onLogout}/>
              <Search state={this.state} searchEvent={this.searchEvent} onRefresh = {this.onRefresh} />
              <Posts state={this.state} onUpdate={this.onUpdate} onRefresh = {this.onRefresh}/>
            </div>
            :<Redirect to="/"/>
            }
                  
              </Route>

              <Route exact path="/bulletin/post">
              {this.state.log||Cookie.get("userData")!==undefined?
                  <div>
                    <Header onLogout={this.onLogout}/>
                    <PostDetails onRefresh = {this.onRefresh}/>
                  </div>
                              :<Redirect to="/"/>
                            }
              </Route>
              <Route exact path="/newentry">
              {this.state.log||Cookie.get("userData")!==undefined?
                  <div>
                    <Header onLogout={this.onLogout}/>
                    <DbForm state={this.state} onRefresh = {this.onRefresh}/>
                  </div>
                   :<Redirect to="/"/>
                  }
              </Route>
              <Route exact path="/update">
              {this.state.log||Cookie.get("userData")!==undefined?
                  <div>
                    <Header onLogout={this.onLogout}/>
                    <DbFormUpdate state={this.state} onRefresh = {this.onRefresh}/>
                  </div>
                  :<Redirect to="/"/>
                }
              </Route>
              <Route exact path="/super">
              {this.state.log||Cookie.get("userData")!==undefined?
                  <div>
                    <Header onLogout={this.onLogout}/>
                    <Submit state={this.state} onRefresh = {this.onRefresh}/>
                  </div>
                  :<Redirect to="/"/>
                }
              </Route>
            </Switch>
          </Router>
        </Stack>
      </Box>
    );
  }
}

export default Main;
