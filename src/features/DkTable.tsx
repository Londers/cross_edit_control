import React from "react";
import {useAppSelector} from "../app/hooks";
import {selectEditInfo} from "./editSlice";
import {DataGrid, GridColumns, GridToolbarQuickFilter, ruRU} from "@mui/x-data-grid";
import {EngagedDk} from "../common";

const defaultColumnOptions = {
    editable: false,
    sortable: false,
    cellClassName: "table-cell-wrap",
    flex: 1
}

const columns: GridColumns = [
    {
        field: "login",
        headerName: "Логин",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "engaged",
        headerName: "Занятые рабочие места",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 4,
    },
    {
        field: "status",
        headerName: "Статус",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },
]

function DkTable(props: { engagedDk: EngagedDk[], setSelectedDk: Function }) {
    const editControl = useAppSelector(selectEditInfo)

    const buildDesc = (dk: EngagedDk): (string | number)[] => {
        const region = editControl.regionInfo[dk.pos.region]
        const area = editControl.areaInfo[region][dk.pos.area]
        return ["Регион: " + region, "Район: " + area, "Описание: " + dk.description, "Номер устрйоства: " + dk.idevice]
    }

    const rows = props.engagedDk.map((dk, index) => {
        return {
            id: JSON.stringify({login: dk.login, pos: dk.pos}),
            login: dk.login,
            engaged: buildDesc(dk),
            status: dk.edit ? "Редактирует" : "Просматривает",
        }
    })

    return (
        <div style={{height: "88vh", width: "48%", margin: "1%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                checkboxSelection={true}
                onSelectionModelChange={(newSelectionModel) => {
                    props.setSelectedDk(newSelectionModel.map((id) => {
                        if (typeof id === "string") {
                            return JSON.parse(id)
                        } else {
                            return undefined
                        }
                    }))
                }}
                components={{
                    Toolbar: () => <GridToolbarQuickFilter/>
                }}
                density="comfortable"
            />}
        </div>
    )
}

export default DkTable;