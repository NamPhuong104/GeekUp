import { Col } from 'antd';
import Search from 'antd/es/input/Search';

function SearchInput() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <Col span={12}>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        size="large"
        style={{
          width: 500,
        }}
      />
    </Col>
  );
}

export default SearchInput;
