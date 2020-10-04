import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getPlaylistIntersect } from './server';

function SongTable (props) {
  if (props.songs == null || props.songs.length === 0) {
    return null;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Song</TableCell>
            <TableCell>Artist</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.songs.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.song}</TableCell>
              <TableCell>{row.artist}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default class Intersect extends React.Component {
  constructor (props) {
    super(props);
  }

  handleChange(key, event) {
    const change = {};
    change[key] = event.target.value;
    if (this.props.onUpdate) this.props.onUpdate(change);
  }

  handleClick() {
    console.log('Filling with dummy data...');
    let songs = [{
      song: 'Love me Do',
      artist: 'Beatles',
    }, {
      song: 'Love Me Do Not',
      artist: 'Bartle',
    }, {
      song: 'Do You Don\'t You',
      artist: 'Haywyre',
    }, {
      song: 'Don\'t You Do You',
      artist: 'Highwrye',
    }, {
      song: 'Do You Love Me Don\'t You',
      artist: 'Beatlewyre'
    }];

    for (let i = 0; i < 3; i++) songs.push(...songs);
    this.props.onUpdate({songs});

    getPlaylistIntersect('1','2').then((r) => {
      console.log(r);
    }).catch((e) => {
      console.log(e);
    });
  }

  render () {
    const songTable = SongTable({songs: this.props.songs});

    return (
      <div>
        <Grid
          container
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              label="Other User's ID"
              value={this.props.userId}
              onChange={(e) => this.handleChange('userId', e)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              onClick={() => this.handleClick()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        <div style={{ 'overflow-y': 'auto' }}>
          {songTable}
        </div>
      </div>
    );
  }
}