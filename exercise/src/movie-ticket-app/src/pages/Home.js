import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {
    state = {
        movie: [],
    }

    componentWillMount = () => {
        const url = 'https://movie-ticket-a8a41.firebaseapp.com/get-all-movie'
        axios.get(url,)
            .then(res => {
                this.setState({
                    movie: res.data
                })
            })
    }

    getMovieNew = (search, sort) => {
        const url = `https://movie-ticket-a8a41.firebaseapp.com/search-movie`
        axios.get(url, {
            params: {
                name_movie: search,
                sort,
            }
        })
        .then((res) => {
            this.setState({
                movie: res.data
            })
        })
    }


    render() {
        const { movie, seat } = this.state
        return (
            <div className="home" >
                <Layout selectMovie={true} pageHome={true} callback={this.getMovieNew}>
                    {
                        movie &&
                        movie.length !== 0 ?
                        movie.map((value, index) => {
                            return (
                                <div className="card-white" key={+index} >
                                    <Row>
                                        <Col xs="3" className="theater" >
                                            <img src="/images/theater.jpg" />
                                            <div className="text size-large dark-blue" > theater {value.theater} </div>
                                        </Col>
                                        <Col xs="auto" className="img-movie">
                                            <img src={value.src_img} />
                                        </Col>
                                        <Col xs="auto" className="detail-movie" >
                                            <div className="bar-name-movie white size-large" >
                                                {`${value.name_movie_en} ${value.name_movie_th}`}
                                            </div>
                                            <div className="sound size-small">
                                                {value.type_movie} : <span className="margin-type-theater" > {value.time_movie} นาที </span>
                                                <span className="box-button white margin-type-theater" >{value.type_theater}</span>
                                                <span className="box-button white margin-type-theater" >{value.sound}</span>
                                                <span className="box-button white" >{value.rate}</span>
                                            </div>
                                            <div className="round-movie" >

                                                {
                                                    value.round_movie.map((v, i) => {
                                                        return (
                                                            <div key={+i} className="box-button">
                                                                <Button className="size-medium" >
                                                                    <Link to={{
                                                                        pathname: '/choose-a-seat', state: {
                                                                            movie: value,
                                                                            timeMovie: v,
                                                                        }
                                                                    }} > {v} </Link>
                                                                </Button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                        :
                        <div className="not-found font size-large white" > ไม่พบภาพยนตร์ </div>
                    }
                </Layout>
            </div>
        )
    }
}

export default Home