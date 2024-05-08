import * as React from "react";
import Box from "@mui/material/Box";
import { UserContext } from "../Components/movieContext";
import { DataGrid } from "@mui/x-data-grid";

export default function FullFeaturedCrudGrid() {
  const { data, setData } = React.useContext(UserContext);
  const [rows, setRows] = React.useState(data);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? updatedRow : row
    );
    setRows(updatedRows);
    setData(updatedRows);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // console.log(data);

  const columns = [
    {
      field: "release_date",
      headerName: "Release Date",
      width: 100,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "super-app-theme--header",
      width: 350,
      editable: true,
    },
    {
      field: "popularity",
      headerName: "Popularity",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#c2e7fa",
        height: 654,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        // '& .super-app-theme--header': {
        //   backgroundColor: 'rgba(255, 7, 0, 0.55)',
        // },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        sx={{
          boxShadow: 2,

          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </Box>
  );
}
