import React, { useState } from "react";
import { Box, Image, Text, Icon, Button ,Flex} from "@chakra-ui/core";
import Axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';



function Posts(props) {
    toast.configure();
    const history = useHistory();
    const userData = JSON.parse(Cookie.get("userData"));
    const onDelete=()=>{
        // userclick coockie post id based delete
        let post = JSON.parse(Cookie.get("userClick"))
        Axios.delete("https://blogdis.herokuapp.com/delete/"+post.id)
        .then((res)=>{
          console.log(res.data,'post deleted')  
          props.onRefresh()
          toast.success(res.data, { position: toast.POSITION.TOP_CENTER });        
        })
        .catch((err)=>console.log(err))
    }
    const onApprove=()=>{
        // onapprove change post status to approved
        //userClick cookie 
        let post = JSON.parse(Cookie.get("userClick"))
          Axios.post("https://blogdis.herokuapp.com/approve",{id:post.id,approve:1})
          .then((res)=>{
            console.log(res.data,'post approved')
            props.onRefresh()
            toast.success("Post approved", { position: toast.POSITION.TOP_CENTER });
          })
          .catch((err)=>console.log(err))
    }
    return (
        <Box>
            {(userData.accType!="superadmin")?(
                props.state.data.map((data,idx)=>(
                <Box key={idx} mx={["16px", "16px", "16px", "40px"]} my={["16px", "16px", "16px", "16px"]} d={["flex", "flex", "flex", "flex"]}>
                            <Box p={4} mb={6} width="100%" boxShadow="0 0 4px 2px rgba(49,49,49,0.10)" borderRadius="md" >
                            <Flex width="100%" >
                            <Box borderRadius="50%" border="2px" w="40px" h="40px" mr={3}>
                            <Text ml="13px" mt="3px" fontSize="16px">
                                
                            </Text>
                        </Box>
                                <Flex width="100%" direction="column">
                                    <Flex width="100%" justifyContent="space-between">
                                        <Text color="#265182" fontWeight="600" fontSize="md">{data.title} </Text>
                                        <Flex>
                                        <Flex onClick={() => {Cookie.set("userClick", JSON.stringify(data));history.push("/update");}} align="center" cursor="pointer" d={userData.accType!=="user" && userData.userName==data.author?"flex":"none"}>
                                            <img  alt=""></img>
                                            <Text mr={4} ml={1} color="#1E9ED2" fontWeight="600">Update </Text>
                                        </Flex>
                                        <Flex onClick={() => {Cookie.set("userClick", JSON.stringify(data));onDelete()}} align="center" cursor="pointer" d={userData.accType!=="user" && userData.userName==data.author?"flex":"none"}>
                                            <img  alt=""></img>
                                            <Text mr={4} ml={1} color="#1E9ED2" fontWeight="600">Delete </Text>
                                        </Flex>
                                        <Flex onClick={() => {Cookie.set("userClick", JSON.stringify(data));history.push("/bulletin/post");}} align="center" cursor="pointer">
                                            <img  alt=""></img>
                                            <Text mr={4} ml={1} color="#1E9ED2" fontWeight="600">View </Text>
                                        </Flex>
                                        </Flex>
                                        
                                    </Flex>
                                    <Flex mt={0} flexDir={{ base: 'column', md: "row" }}>
                                        <Text color="#343434" fontSize="xs">{data.author}</Text>
                                        <Box borderRight="1px solid #B8B8B8" mt={1} mb={1} mx={2} display={{ base: "none", md: 'block' }}></Box>
                                        <Text color="#343434" fontSize="xs">{data.createdAt}</Text>
                                    </Flex>
                                    <Text my={4} ml={{ base: "-2.75rem", md: 0 }}>{data.info}</Text>
                                    {/* <Box w={{ base: "280px", md: "400px" }} h="200px" borderRadius="md" backgroundColor="tomato" ml={{ base: "-2.75rem", md: 0 }}></Box> */}
                                </Flex>
                            </Flex>
                        </Box>
            </Box>
            )))
            :(
                props.state.data.filter((data)=>(
                    data.approve==0)).map((data,idx)=>(
                  <Box key={idx} mx={["16px", "16px", "16px", "40px"]} my={["16px", "16px", "16px", "16px"]} d={["flex", "flex", "flex", "flex"]}>
                              <Box p={4} mb={6} width="100%" boxShadow="0 0 4px 2px rgba(49,49,49,0.10)" borderRadius="md" >
                              <Flex width="100%" >
                              <Box borderRadius="50%" border="2px" w="40px" h="40px" mr={3}>
                            <Text ml="13px" mt="3px" fontSize="16px">
                                
                            </Text>
                        </Box>
                                  <Flex width="100%" direction="column">
                                      <Flex width="100%" justifyContent="space-between">
                                          <Text color="#265182" fontWeight="600" fontSize="md">{data.title} </Text>
                                          <Flex>
                                          <Flex onClick={() => {Cookie.set("userClick", JSON.stringify(data)); onApprove()}} align="center" cursor="pointer" d={(userData.accType=="superadmin")?"flex":"none"}>
                                              <img  alt=""></img>
                                              <Text mr={4} ml={1} color="#1E9ED2" fontWeight="600">Approve </Text>
                                          </Flex>
                                          <Flex onClick={() => {Cookie.set("userClick", JSON.stringify(data));history.push("/bulletin/post");}} align="center" cursor="pointer">
                                              <img  alt=""></img>
                                              <Text mr={4} ml={1} color="#1E9ED2" fontWeight="600">View </Text>
                                          </Flex>
                                          </Flex>
                                          
                                      </Flex>
                                      <Flex mt={0} flexDir={{ base: 'column', md: "row" }}>
                                          <Text color="#343434" fontSize="xs">{data.author}</Text>
                                          <Box borderRight="1px solid #B8B8B8" mt={1} mb={1} mx={2} display={{ base: "none", md: 'block' }}></Box>
                                          <Text color="#343434" fontSize="xs">{data.createdAt}</Text>
                                      </Flex>
                                      <Text my={4} ml={{ base: "-2.75rem", md: 0 }}>{data.info}</Text>
                                      {/* <Box w={{ base: "280px", md: "400px" }} h="200px" borderRadius="md" backgroundColor="tomato" ml={{ base: "-2.75rem", md: 0 }}></Box> */}
                                  </Flex>
                              </Flex>
                                </Box>
                    </Box>
                ))
            )}
        </Box>
    );
}
export default Posts;