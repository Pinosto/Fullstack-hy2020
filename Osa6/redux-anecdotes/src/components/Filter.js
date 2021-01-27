import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/FilterReducer'
import { filterReset } from '../reducers/FilterReducer'


const Filter = ({ filterChange, filterReset }) => {
  // const dispatch = useDispatch()

  const handleChange = (e) => {
    // dispatch(filterChange(e.target.value))
    filterChange(e.target.value)
  }
  const handleReset = () => {
    // dispatch(filterReset())
    filterReset()
    document.getElementById('filterInput').value = ''
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input id='filterInput' onChange={handleChange} /> <button onClick={handleReset}>reset</button>
    </div>
  )
}

// export default Filter
export default connect(
  null,
  { filterChange, filterReset }
)(Filter)