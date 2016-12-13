// @flow
import EditProfile from '.'
import {compose, withState, withProps, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {editProfile} from '../../actions/profile'
import {maxProfileBioChars} from '../../constants/profile'
import {navigateUp} from '../../actions/route-tree'

import type {TypedDispatch} from '../../constants/types/flux'
import type {TypedState} from '../../constants/reducer'

type OwnProps = {
  routeState: {
    bio: ?string,
    location: ?string,
    fullname: ?string,
  },
}

export default compose(
  connect(
    (state: TypedState, {routeState}: OwnProps) => {
      const tracker = state.tracker.trackers[state.config.username || '']
      const userInfo = tracker && tracker.type === 'tracker' && tracker.userInfo
      const bio = routeState.hasOwnProperty('bio') && routeState.bio || userInfo && userInfo.bio || ''
      const fullname = routeState.hasOwnProperty('fullname') && routeState.fullname || userInfo && userInfo.fullname
      const location = routeState.hasOwnProperty('location') && routeState.location || userInfo && userInfo.location
      return {
        bio,
        fullname,
        location,
        bioLengthLeft: maxProfileBioChars - bio.length,
      }
    },
    (dispatch: TypedDispatch<*>, {routeState, setRouteState, bio, fullname, location}) => ({
      onCancel: () => dispatch(navigateUp()),
      onBack: () => dispatch(navigateUp()),
      onSubmit: (bio, fullname, location) => dispatch(editProfile(bio, fullname, location)),
    })
  ),
  withState('fullname', 'onFullnameChange', props => props.fullname),
  withState('location', 'onLocationChange', props => props.location),
  withState('bio', 'onBioChange', props => props.bio),
  withProps(props => ({
    onSubmit: () => props.onSubmit(props.fullname, props.location, props.bio),
  })),
  lifecycle({
    componentWillUnmount: function () {
      const {setRouteState, fullname, location, bio} = this.props
      setRouteState({fullname, location, bio})
    },
  }),
)(EditProfile)