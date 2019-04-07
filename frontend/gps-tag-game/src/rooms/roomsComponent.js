import React, {useEffect, useState} from "react";
import "./rooms.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withRouter} from 'react-router-dom'


const RoomsComponent = ({history, match}) => {
    const id = match.params.id
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/rooms').then(response => response.json()).then(rooms => {
                console.log(rooms)
                setRooms(rooms)
            }
        )
    }, []);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Pokój</TableCell>
                    <TableCell>Host</TableCell>
                    <TableCell>Miejsce </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rooms.map(row => (
                    <TableRow key={row.id} onClick={() => history.push(`/game/${id}/${row.id}`)}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell>{row.hostName}</TableCell>
                        <TableCell>{row.players.length} / {row.capacity}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default withRouter(RoomsComponent);
