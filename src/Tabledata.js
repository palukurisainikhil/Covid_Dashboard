import React from "react";
import { Card, CardContent } from "@material-ui/core";
import './Table.css';
import numeral from "numeral"


//dispalying all countries in the table
function Tabledata({ countriesTable }) {
    return (
        <Card >
            <CardContent>
                <h4 class="table_head">TOTAL CASES COUNTRYWISE</h4>
                <div className='table'>
                    {
                        countriesTable.map((country) => (
                            <tr>
                                <td><img src={country.countryInfo.flag} width="30" ></img></td>
                                <td>{country.country}</td>
                                <td>{numeral(country.cases).format("0,0")}</td>
                            </tr>
                        ))
                    }
                </div>

            </CardContent>
        </Card>
    );
}

export default Tabledata;