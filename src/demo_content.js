export const DEMO_CONTENT = `
<p>
  <strong>Exsied</strong>: <strong>Ex</strong>tremely <strong>si</strong>mple
  <strong>ed</strong>itor. The pronunciation is <code>/ɪkˈsiːd/</code>, the same
  as <strong>exceed</strong>.
</p>

<p>  
  <a href="https://github.com/exsied/exsied">Github repo </a> /
  <a href="https://gitee.com/exsied/exsied">Gitee repo </a> /
  <a href="https://enassi.pages.dev/en/exsied/about/">Document </a>
</p>

<p>
  <u><b>Exied</b> is the main editor of <b>enassi</b></u>
  , implemented through <i>native JavaScript events binding</i>.
  <b>Enassi</b> is your encryption assistant that supports multiple file types <i>(
  <u>including <b>markdown</b>, <b>PDF</b>, <b>images</b>, etc.</u> )</i>, supports
  <b>file encryption</b> and <b>synchronization</b>
</p>

<h2>Features:</h2>
<ul>
  <li>
    <p>
      No complex concepts, <strong>exsied</strong> is written entirely in native
      JavaScript events binding.
    </p>
  </li>
  <li>
    <p>No dependencies.</p>
  </li>
  <li>
    <p>Easy to configure / custom / develop.</p>
  </li>
  <li>
    <p>All functions are based on plugins.</p>
  </li>
</ul>

<h2>Other demo</h2>
<p>
  <s><u>This line</u> has been <b>deleted</b></s>
</p>

<h3>Table</h3>
<table>
  <tbody>
    <tr>
      <td>cell one 1-1</td>
      <td>cell one 1-2</td>
    </tr>
    <tr>
      <td>cell one 2-1</td>
      <td>cell one 2-2</td>
    </tr>
    <tr>
      <td><br /></td>
      <td><br /></td>
    </tr>
  </tbody>
</table>

<table>
  <tbody>
    <tr>
      <td>cell two 1-1</td>
      <td>cell two 1-2</td>
    </tr>
    <tr>
      <td><br /></td>
      <td><br /></td>
    </tr>
    <tr>
      <td>cell two 3-1</td>
      <td>cell two 3-2</td>
    </tr>
  </tbody>
</table>

<h3>Source code</h3>
<p>Developers should <u>overwrite <b>edit and highlight</b> functions</u>.</p>
<h4>Source code 1</h4>
<pre>
  <code lang="javascript">
    let a = 1;
    let b = "rust";
    let c = [];
  </code>
</pre>

<h4>Source code 2</h4>
<pre>
  <code lang="rust">
    use ferris_says::say; // from the previous step
    use std::io::{stdout, BufWriter};
    
    fn main() {
        let stdout = stdout();
        let message = String::from("Hello fellow Rustaceans!");
        let width = message.chars().count();
    
        let mut writer = BufWriter::new(stdout.lock());
        say(&message, width, &mut writer).unwrap();
    }
  </code>
</pre>
`

