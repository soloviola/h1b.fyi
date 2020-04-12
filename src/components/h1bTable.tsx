import React, { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { COLUMN_INDEX } from '../Consts';
import MaterialTable from 'material-table';

import CircularProgress from '@material-ui/core/CircularProgress';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import {
  createStyles,
  makeStyles
} from "@material-ui/core/styles";

const tableColumns = [
  { field: "jobTitle",     title: "Job Title",    cellStyle: { width: "27%" }, headerStyle: { width: "27%" }},
  { field: "employerName", title: "Company Name", },
  { field: "city",         title: "City",         },
  { field: "state",        title: "State",        },
  { field: "caseDate",     title: "Case Date",    cellStyle: { width: "27%" }, headerStyle: { width: "27%" }},
  { field: "wage",         title: "Wage",         cellStyle: { width: "27%" }, headerStyle: { width: "27%" }, filterComponent: FilterComponent}
];

function FilterComponent(props: any) {
  const { columnDef, onFilterChanged } = props; 
  return (
    <TextField
      style={columnDef.type === 'numeric' ? { float: 'right' } : {}}
      type={columnDef.type === 'numeric' ? 'number' : 'search'}
      onChange={(event: any) => {
        onFilterChanged(columnDef.tableData.id, event.target.value);
      }}
    />
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "100%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
);
const tableIcons = {
  Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
}

const rowClickCallback = (event: any, rowData: any) => {
  console.log(rowData)
}

const H1bTable = (params: any) => {
  const classes = useStyles();

  const formattedResult = params.searchResult.map((item: any, key: any) => {
    let wage = 0
    if (!!item[COLUMN_INDEX['WAGE_RATE_OF_PAY_TO_1']]) {
      wage = item[COLUMN_INDEX['WAGE_RATE_OF_PAY_TO_1']]
    }
    else if (!!item[COLUMN_INDEX['WAGE_RATE_OF_PAY_FROM_1']]) {
      wage = item[COLUMN_INDEX['WAGE_RATE_OF_PAY_FROM_1']]
    }
    else {
      wage = item[COLUMN_INDEX['PREVAILING_WAGE_1']]
    }
    if (item[COLUMN_INDEX['WAGE_UNIT_OF_PAY_1']] === 'Hour') {
      wage = -1
    }
    else {
      wage = Math.trunc(Number(wage))
    }
    return {
      jobTitle: item[COLUMN_INDEX["JOB_TITLE"]],
      employerName: item[COLUMN_INDEX['EMPLOYER_NAME']],
      city: item[COLUMN_INDEX["WORKSITE_CITY_1"]],
      state: item[COLUMN_INDEX["WORKSITE_STATE_1"]],
      id: item[COLUMN_INDEX["CASE_NUMBER"]],
      caseDate: (new Date(item[COLUMN_INDEX["CASE_SUBMITTED"]])).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      wage
    }
  }).filter((item: any) => { // remove hour pay for now
    if (item.wage === -1) {
      return false
    }
    return true
  })
  const tableVisibility = params.querying ? "none": "block"
  const queryingLabelDisplay = params.querying ? "block": "none"
  return (
    <Box>
      <Box display={queryingLabelDisplay} className={classes.paper}>
          <CircularProgress />
      </Box>
      <Box display={tableVisibility}>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            <MaterialTable
              icons={tableIcons}
              title=""
              columns={ tableColumns }
              onRowClick={ rowClickCallback }
              data={ formattedResult }
              options={{
                sorting: true, 
                filtering: true,
                padding: 'dense',
                pageSize: 10,
                pageSizeOptions: [10, 20, 50, 100],
                paginationType: "normal"
              }}
            />
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default H1bTable