import gsap from "gsap"
import { connectMqtt } from "./mqttClient"

/** @type{HTMLImageElement} */
const imageLeft =
	document.getElementById("image-left")

/** @type{HTMLDivElement} */
const containerImageLeft = document.querySelector(
	".container-left",
)

/** @type{HTMLImageElement} */
const imageRight = document.getElementById(
	"image-right",
)

/** @type{HTMLDivElement} */
const containerImageRight =
	document.querySelector(".container-right")

/**
 * play translate animation
 * @param {boolean} isLeftToRight: image need to run left to right?
 * @param {HTMLDivElement} image: image to load animation
 */
function playAnimation(isLeftToRight, image) {
	let runLeftToRightOrReverse = "100"

	if (isLeftToRight) {
		runLeftToRightOrReverse = "-100"
	}

	gsap.from(image, {
		duration: 3,
		x: runLeftToRightOrReverse,
		ease: "power4",
		opacity: 0,
	})
}

/**
 * This function helps to parse data
 * @param {String} jsonString json from MQTT
 * @returns object data contains 2 data
 */
function parseJsonData(jsonString) {
	const jsonData = JSON.parse(jsonString)
	const firstImageLink = jsonData.srcImage1
	const secondImageLink = jsonData.srcImage2
	return { firstImageLink, secondImageLink }
}

const mqttClient = connectMqtt()

mqttClient.on("message", (topic, message) => {
	if (message == null) return
	if (message.toString().length == 0) return

	const { firstImageLink, secondImageLink } =
		parseJsonData(message.toString())

	imageLeft.src = firstImageLink
	imageRight.src = secondImageLink

	playAnimation(true, containerImageLeft)
	playAnimation(false, containerImageRight)
})
