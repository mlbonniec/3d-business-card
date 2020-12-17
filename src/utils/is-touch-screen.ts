export default function isTouchScreen(): boolean {
	return 'createTouch' in document;
}
