// Imports
import React, { PureComponent } from 'react'            // Frontend framework
import PropTypes from 'prop-types'                      // Prop validating
import { connect } from 'react-redux'                   // connect to the redux store
import { Helmet } from 'react-helmet'                   // History Object

// UI Imports
// HTML Style-embedded Component Templates
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import { getList as getCratesList } from './api/actions'  // fetch requests from the server
import Loading from '../common/Loading'                   // loading component
import EmptyMessage from '../common/EmptyMessage'         // message component
import CrateItem from './Item'                            // component for a single crate item

// Component
class List extends PureComponent {

  // Runs on server only for SSR - server-side-rendering
  static fetchData({ store }) {
    return store.dispatch(getCratesList('ASC'))
  }

  // Runs on client only
  // On load, fetch crateData in ascending order
  componentDidMount() {
    this.props.getCratesList('ASC')
  }

  render() {
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Crates for everyone! - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Crates for everyone!</H3>

            <p style={{ marginTop: '1em', color: grey2 }}>You can choose crate which suits your need. You can also
              subscribe to multiple crates.</p>
          </GridCell>
        </Grid>

        {/* Crate list */}
        <Grid>
          <GridCell>
            {
              this.props.crates.isLoading
                ? <Loading/>
                : this.props.crates.list.length > 0
                    ? this.props.crates.list.map(crate => (
                      <div key={crate.id} style={{ margin: '2em', float: 'left' }}>
                        <CrateItem crate={crate}/>
                      </div>
                    ))
                    : <EmptyMessage message="No crates to show" />
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  crates: PropTypes.object.isRequired,
  getCratesList: PropTypes.func.isRequired
}

// Component State
// redux
function listState(state) {
  return {
    crates: state.crates
  }
}

// redux state management / prop management
export default connect(listState, { getCratesList })(List)