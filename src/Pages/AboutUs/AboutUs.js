import classes from "./AboutUs.module.css"
import img_1 from "./img_1.png"

export default function AboutUs() {
    return (

        <div className={classes.div}>
            <h1 className={classes.h1}>Lorem Ipsum is simply dummy text of the printing and.</h1>
            <p className={classes.p}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            <img className={classes.img} src={img_1} alt={img_1}></img>
            <h6 className={classes.h6}>Why work with us</h6>
        </div>

    )
}