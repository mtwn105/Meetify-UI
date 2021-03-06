/*
 * "Intersect" portion of the app, selectable from the tab bar
 * Allows current user to intersect their liked songs with another user
 * (NOTE: Currently just contains test data)
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserId, importSongs } from './intersectSlice'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import SongTile from '../SongTile';

const useStyles = makeStyles((theme) => ({
  songTile: {
    height: theme.tile.height,
    width: '100%',
    padding: '8px',
  }
}))

export default function Intersect (props) {
  const classes = useStyles()

  // Use state primarily to maintain an internal "cache" when this gets unmounted
  const userId = useSelector(state => state.intersect.userId)
  const songs = useSelector(state => state.intersect.songs)
  const dispatch = useDispatch()

  const loggedInUserId = useSelector(state => state.account.username)

  const handleSubmit = () => {
    dispatch(importSongs({user1: loggedInUserId, user2: userId}))
  }

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
            variant="outlined"
            value={userId}
            onChange={e => dispatch(setUserId(e.target.value))}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* TODO: Make scrollable, e.g.... */}
      {/* <div style={{ overflowY: 'auto', height: '200px' }}> */}
      <div>
        {songs.map((row, index) => (
          <div className={classes.songTile} key={index}>
            <SongTile
              song={row.song}
              artist={row.artist}
              /* album={row.album} */
              albumArtUrl={row.albumArtUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
