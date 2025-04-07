import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Hero Section with Vision and Purpose */}
      <section className='relative py-20 px-4 md:px-8 lg:px-16 bg-muted/30 dark:bg-muted/10'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>About MegaShop</h1>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              Your premier destination for quality products and exceptional shopping experiences
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-12'>
            <Card className='border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up'>
              <CardHeader>
                <CardTitle className='text-2xl text-foreground'>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  At MegaShop, we envision a world where quality products are accessible to everyone. We strive to
                  create a seamless shopping experience that combines convenience, reliability, and customer
                  satisfaction.
                </p>
              </CardContent>
            </Card>

            <Card className='border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up animation-delay-200'>
              <CardHeader>
                <CardTitle className='text-2xl text-foreground'>Our Purpose</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Our purpose is to connect customers with the best products while providing exceptional service. We
                  believe in transparency, quality, and building lasting relationships with our customers and partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section ref={sectionRef} className='py-20 px-4 md:px-8 lg:px-16 bg-background'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2
              className={`text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Who Shops With Us
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-150 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Discover the diverse community of shoppers who trust MegaShop for their needs
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <Card
              className={`border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } delay-300`}
            >
              <CardHeader>
                <CardTitle className='text-xl text-foreground'>Tech Enthusiasts</CardTitle>
                <CardDescription>Looking for the latest gadgets and accessories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Our tech-savvy customers find cutting-edge products and accessories to enhance their digital
                  lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } delay-500`}
            >
              <CardHeader>
                <CardTitle className='text-xl text-foreground'>Home Decorators</CardTitle>
                <CardDescription>Creating beautiful living spaces</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Interior design enthusiasts discover unique pieces to transform their homes into stylish sanctuaries.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } delay-700`}
            >
              <CardHeader>
                <CardTitle className='text-xl text-foreground'>Fashion Forward</CardTitle>
                <CardDescription>Expressing personal style</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Style-conscious shoppers find trendy clothing and accessories to express their unique fashion sense.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section with Google Maps */}
      <section className='py-20 px-4 md:px-8 lg:px-16 bg-muted/30 dark:bg-muted/10'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>Our Location</h2>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              Visit us in the heart of Ho Chi Minh City, Vietnam
            </p>
          </div>

          <div className='rounded-lg overflow-hidden shadow-md h-[400px] w-full'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197956!2d106.69877!3d10.823099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3b4a7d6d%3A0x7c0e6d1b5c0e6d1b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='MegaShop Location in Ho Chi Minh City'
            ></iframe>
          </div>

          <div className='mt-8 text-center'>
            <p className='text-muted-foreground'>123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className='py-20 px-4 md:px-8 lg:px-16 bg-background'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>Contact Us</h2>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              Have questions or feedback? We'd love to hear from you
            </p>
          </div>

          <div className='max-w-2xl mx-auto'>
            <Card className='border-border shadow-sm'>
              <CardHeader>
                <CardTitle className='text-2xl text-foreground'>Send Us a Message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className='space-y-4'>
                  <div className='space-y-2'>
                    <label htmlFor='name' className='text-sm font-medium text-foreground'>
                      Name
                    </label>
                    <Input id='name' placeholder='Your name' className='border-input' />
                  </div>

                  <div className='space-y-2'>
                    <label htmlFor='email' className='text-sm font-medium text-foreground'>
                      Email
                    </label>
                    <Input id='email' type='email' placeholder='your.email@example.com' className='border-input' />
                  </div>

                  <div className='space-y-2'>
                    <label htmlFor='message' className='text-sm font-medium text-foreground'>
                      Message
                    </label>
                    <Textarea id='message' placeholder='How can we help you?' className='min-h-[120px] border-input' />
                  </div>

                  <Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'>
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
