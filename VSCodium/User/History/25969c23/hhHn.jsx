import {React, useEffect, useState} from 'react'
import {toast, Toaster} from 'react-hot-toast'
import useLink from '../hooks/useLink'
import Input from './Input'
import Link from './Link'

const Form = () => {
  const [url, setUrl] = useState({
    fullLink: '',
  })

  //? use custom link for getting response
  const {
    data,
    refetch,
    isRefetching,
    isLoading,
    isError,
    isFetching,
    isPaused,
    isOnline,
  } = useLink(url.fullLink)

  //* input change event
  const onChange = e => {
    const {name, value} = e.target
    setUrl(prevUrl => {
      return {
        ...prevUrl,
        [name]: value,
      }
    })
  }

  //* button.addEventListener()
  const getUrl = e => {
    e.preventDefault()
    refetch()
    console.log(`data: ${data}`)
    //* set all links reset again
    setUrl(prevUrl => {
      return {
        ...prevUrl,
        fullLink: '',
        shortLink: '',
      }
    })
  }

  useEffect(() => {
    if (data?.result) {
      toast.success(`You get that link ${data?.result.short_link}`)
    }
  }, [data])

  if (!isOnline) {
    return <div>Send me your dickpick...</div>
  }
  return (
    <div className="flex flex-col gap-5">
      <form className="py-4" onSubmit={getUrl}>
        <fieldset className="md:flex md:gap-4 items-center">
          <Input fullLink={url.fullLink} handleChange={onChange} />
          <button className="flex items-center justify-center m-auto p-2 md:px-5 font-bold transition bg-gray-200  border-4 border-black  rounded-xl focus:outline-none focus:ring shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#999] hover:shadow-none dark:hover:shadow-none  active:bg-pink-50 mt-5 md:m-0">
            Give me that god damn short link
          </button>
          <Toaster />
        </fieldset>
      </form>
      {data &&
        !data.disallowed_reason &&
        (isFetching ? (
          'Fetching...'
        ) : (
          <Link
            shortLink={data?.result?.short_link}
            originalLink={data?.result?.original_link}
          />
        ))}
    </div>
  )
}

export default Form
