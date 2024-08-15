import React from 'react'
import {Outlet,useNavigate } from 'react-router-dom'
import styled from '@/utils/styled-px2rem'

const Tab = styled.div`
    a{padding:5px;cursor:pointer;color:blue}
`

export default function(){
    const navigate = useNavigate()
    return <>
        <Tab>
            <a onClick={()=>navigate('/')}>Home</a>
            <a onClick={()=>navigate('/Test')}>Test</a>
        </Tab>
        <Outlet></Outlet>
    </>
}