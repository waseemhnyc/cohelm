import {
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  Plus,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  plus: Plus,
  logo: (props: LucideProps) => (
    <svg width="32" height="32" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg" {...props} >
      <path 
        fillRule="evenodd" clipRule="evenodd" fill="currentColor" 
        d="M35 0C54.33 0 70 15.67 70 35H69.375H40H35V40V69.375V70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0ZM35 74.375V105H105V35H74.375C74.375 36.6938 74.2681 38.3626 74.0605 40C71.8114 57.748 57.748 71.8114 40 74.0605C38.3626 74.2681 36.6938 74.375 35 74.375ZM40 40H69.014C66.8307 54.9828 54.9828 66.8307 40 69.014V40Z" >
      </path>
    </svg>
  )
}
