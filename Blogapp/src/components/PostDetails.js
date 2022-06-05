import React, { useState,useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { postContext } from "./Dashboard";
import {Box,Text,Flex} from "@chakra-ui/core";
import { Link } from 'react-router-dom'
import Cookie from "js-cookie";
function PostDetails(props) {
    const viewpost = JSON.parse(Cookie.get("userClick"));
    return(
        <Box pt={6} px={6} >
            <Flex as={Link} to="/bulletin" align="center" mb={6}>
                <Box as={"img"}  alt="" mr={1} w={4} h={4} />
                <Text color="#343434" fontWeight='700' fontSize='md'>Back</Text>
            </Flex>
            <Box p={4} mb={6} width="100%" boxShadow="0 0 4px 2px rgba(49,49,49,0.10)" borderRadius="md" h={{md:"80vh"}} overflowY="scroll" >
                <Flex width="100%" >
                    <Box as="img"  w="40px" h="40px" mr={3} />
                    <Flex width="100%" direction="column">
                        <Flex width="100%" justifyContent="space-between">
                            <Text color="#265182" fontWeight="600" fontSize="md">{viewpost.title}</Text>
                        </Flex>
                        <Flex mt={0} flexDir={{ base: 'column', md: "row" }}>
                            <Text color="#343434" fontSize="xs">{viewpost.username}</Text>
                            <Box borderRight="1px solid #B8B8B8" mt={1} mb={1} mx={2} display={{ base: "none", md: 'block' }}></Box>
                            <Text color="#343434" fontSize="xs">{viewpost.createdAt}</Text>
                        </Flex>
                        <Box ml={{ base: "-2.75rem", md: 0 }}>
                            <Text my={4} >{viewpost.info}</Text>
                            {/* <Box w={{ base: "280px", md: "400px" }} h="200px" borderRadius="md" backgroundColor="tomato" ></Box> */}
                        </Box>

                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
}
export default PostDetails;