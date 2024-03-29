import Base from '../Base'
import style from './style'
class Dropdown extends Base {

    constructor() {
        super()
        this.addStyle(style)
    }

    get template() {
        return `
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">WordPress</a>
                    <!-- First Tier Drop Down -->
                    <ul>
                        <li><a href="#">Themes</a></li>
                        <li><a href="#">Plugins</a></li>
                        <li><a href="#">Tutorials</a></li>
                    </ul>        
                    </li>
                    <li><a href="#">Web Design</a>
                    <!-- First Tier Drop Down -->
                    <ul>
                        <li><a href="#">Resources</a></li>
                        <li><a href="#">Links</a></li>
                        <li><a href="#">Tutorials</a>
                        <!-- Second Tier Drop Down -->
                        <ul>
                            <li><a href="#">HTML/CSS</a></li>
                            <li><a href="#">jQuery</a></li>
                            <li><a href="#">Other</a>
                                <!-- Third Tier Drop Down -->
                                <ul>
                                    <li><a href="#">Stuff</a></li>
                                    <li><a href="#">Things</a></li>
                                    <li><a href="#">Other Stuff</a></li>
                                </ul>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </li>
                    <li><a href="#">Graphic Design</a></li>
                    <li><a href="#">Inspiration</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </nav>
        `

    }
}

export default Dropdown