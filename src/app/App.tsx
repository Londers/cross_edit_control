import React, {useEffect, useState} from 'react';
import './App.sass';
import axios, {AxiosResponse} from "axios";
import {EditInfo, EngagedDk} from "../common";
import {selectEditInfo, setEditInfo} from "../features/editSlice";
import {useAppDispatch, useAppSelector} from "./hooks";
import DkTable from "../features/DkTable";
import {Button} from "@mui/material";
import {selectForKick, setArmDkForKickInfo, setDkForKick, setForKickInfo} from "../features/dkForKickSlice";

function App() {
    const dispatch = useAppDispatch()
    const editControl = useAppSelector(selectEditInfo)
    const forKickInfo = useAppSelector(selectForKick)

    const setSelectedDk = (dk: EngagedDk[]) => dispatch(setDkForKick(dk))
    const setSelectedArmDk = (armDk: EngagedDk[]) => dispatch(setArmDkForKickInfo(armDk))

    const [refresh, setRefresh] = useState<boolean>(false)

    const handleRefresh = () => setRefresh(!refresh)
    const handleKick = () => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/manage/crossEditControl/free"
        } else {
            href = window.location.href + "/free"
        }
        axios.post(
            href,
            forKickInfo,
        ).then((response: AxiosResponse<EditInfo>) => {
            handleRefresh()
        }).catch((error) => {
            window.alert(error.message)
        })
    }

    useEffect(() => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/manage/crossEditControl"
        } else {
            href = window.location.href
        }
        axios.post(
            href,
        ).then((response: AxiosResponse<EditInfo>) => {
            dispatch(setEditInfo(response.data))
            dispatch(setForKickInfo({...response.data, crosses: forKickInfo.crosses, arms: forKickInfo.arms}))
        }).catch((error) => {
            window.alert(error.message)
        })
    }, [dispatch, refresh])

    return (
        <div className="App">
            <div style={{display: "inline-flex", width: "100%", fontSize: 30}}>
                <div style={{width: "50%"}}>ДК</div>
                <div style={{width: "50%"}}>АРМ ДК</div>
            </div>
            <div style={{width: "60%", margin: "0 20%"}}>
                <Button variant="outlined" onClick={handleRefresh}>
                    Обновить
                </Button>
                <Button variant="outlined" onClick={handleKick}>
                    Отключить
                </Button>
            </div>
            <div style={{display: "inline-flex", width: "100%"}}>
                <DkTable engagedDk={editControl.crosses} setSelectedDk={setSelectedDk}/>
                <DkTable engagedDk={editControl.arms} setSelectedDk={setSelectedArmDk}/>
            </div>
        </div>
    );
}

export default App;
