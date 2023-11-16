export default function Search() {
  return (
    <div>
      <form action="/results" method="get">
        <input type="text" name="keyword" id="keyword"/>
        <input type="submit" />
      </form>
    </div>
  )
}
