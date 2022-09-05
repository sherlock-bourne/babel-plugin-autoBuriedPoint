// @debug
class App {
	// inner
	/* 块级 */
	// class
	inClass() {
		// buried-0
		console.log("inClass");
	}
}
// 外边的注释

function fn() { // fn右边
	// buried-1
	const a = 1;
	function inFn() {
		// buried-2
		// buried-3
		console.log(2);
		// buried-4
	}
	// 调用inFn前
	inFn();

	function testFn() {
		const a = 123;
		// buried-7
		function testFn2() {
			console.log(234);
			// buried-5
			const arr = () => {
				// buried-6
				function testFn3() {
					// test
				}
			};
		}
	}
}
fn();

const a = () => {
	// buri-error
};
a();