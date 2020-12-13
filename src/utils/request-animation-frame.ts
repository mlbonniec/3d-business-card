export default (
	window.requestAnimationFrame ||
	(window as any).mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	(window as any).msRequestAnimationFrame
);
