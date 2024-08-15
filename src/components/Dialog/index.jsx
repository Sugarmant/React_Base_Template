import styled from '@/utils/styled-px2rem'

const Node = styled.div`width:100px;height:100px;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);font-size:22px;background-color:#eee;
    
`

export default function(){
    return <Node>
        This is dialog
    </Node>
}