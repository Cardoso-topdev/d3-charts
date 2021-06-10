/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/component/BasicLineChart/BasicLineChart.tsx

Created with;
$ npx generate-react-cli component BasicLineChart --type=d3

*/

import React, { useState, useEffect, RefObject } from 'react'
import './BasicLineChart.scss'
import * as d3 from 'd3' // yarn add d3 @types/d3
import { Types } from '../types'

const BasicLineChart = ( props : IBasicLineChartProps ) => {
  const [myState, setMyState] = useState<Boolean>(true)
  const ref: RefObject<HTMLDivElement> = React.createRef()

  useEffect(() => {
    draw()
  })

  const draw = () => {
    const width = props.width - props.left - props.right
    const height = props.height - props.top - props.bottom

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width + props.left + props.right)
      .attr('height', height + props.top + props.bottom)
      .append('g')
      .attr('transform', `translate(${props.left},${props.top})`)

    d3.dsv(',', '/Data/line.csv', (d) => {
      const res = (d as unknown) as {
        Date: string,
        Open: number
      }
      const date = d3.timeParse('%Y-%m-%d')(res.Date)
      const retObj = {
        date,
        value: +res.Open,
      }
      return retObj
    }).then((data) => {
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data, (d) => {
            return d.date
          }) as [Date, Date] 
        )
        .range([0, width])
      svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x))

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, (d) => {
            return Math.max(...data.map((dt) => ((dt as unknown) as Types.Data).value), 0)
          }),
        ] as number[])
        .range([height, 0])
      svg.append('g').call(d3.axisLeft(y))
      
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', props.fill)
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          // @ts-ignore
          d3
            .line()
            .x((d) => x(((d as unknown) as { date: number }).date) )
            .y((d) => y(((d as unknown) as {date: any, value: any}).value) )
        )
    })
  }

  return <div className="BasicLineChart" ref={ref} />
}

interface IBasicLineChartProps {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
  fill: string
}

export default BasicLineChart
