import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Image src ="/logo.jpg" alt="" width={110} height={77}/>
            </div>
            <Link href="/">Home</Link>
            <Link href="/page2">Hello World</Link>
            <Link href="/page3">Add</Link>
            <Link href="/page4">Is Even</Link>
            <Link href="/page5">Fibonacci 5</Link>
        </nav>
      );
}
 
export default Navbar;