using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cadastro_funcionarios_API.Model
{
    public class Response
    {
        public int status { get; set; }
        public int message { get; set; }
        public object result { get; set; }
        
    }
}
