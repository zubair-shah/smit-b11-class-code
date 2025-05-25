import { Component } from "react";

class Carousel extends Component {
    state = {
        active: 0
    }
    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
    };
    handleIndexClick = event => {
        console.log(event)
        this.setState({
            active: +event.target.dataset.index
        });
    };
    render() {
        let { active } = this.state
        let { images } = this.props;
        console.log(active)
        console.log(images)
        return (
            <div className="carousel">
                <img src={images[active]} alt="animal" />
                <div className="carousel-smaller">
                    {images.map((photo, index) => (
                        // eslint-disable-next-line
                        <img
                            key={photo}
                            src={photo}
                            className={index === active ? "active" : ""}
                            alt="animal thumbnail"
                            onClick={this.handleIndexClick}
                            data-index={index}
                        />
                    ))}
                </div>
            </div>
        )
    }

}

export default Carousel;