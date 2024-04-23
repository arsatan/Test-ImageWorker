using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using ImageWorker.Models;
using Microsoft.IdentityModel.Tokens;

namespace ImageWorker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataItemsController : ControllerBase
    {
        private readonly DataContext _context;
        public DataItemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/DataItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DataItem>>> GetDataItems()
        {
            return await _context.DataItems.ToListAsync();
        }

        // GET: api/DataItems/5
        [HttpGet("{fileName}")]
        public async Task<ActionResult<DataItem>> GetDataItem(string fileName)
        {
            var dataItem = await _context.DataItems.FindAsync(fileName);
            if (dataItem == null)
            {
                return NotFound();
            }
            return dataItem;
        }
        
        // POST: api/DataItems/5
        [HttpPost()]
        public async Task<ActionResult<DataItem>> PostDataItem(DataItem dataItem)
        {
            dataItem.GuId = Guid.NewGuid().ToString().ToUpper();
            _context.DataItems.Add(dataItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DataItemExists(dataItem.FileName)) //|| dataItem.FileName.IsNullOrEmpty())
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetDataItem", new { filename = dataItem.FileName,
            }, dataItem);
            //return CreatedAtAction("GetDataItem", dataItem.FileName);
        }

        //// PUT: api/FileItems/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutFileItem(string id, DataItem fileItem)
        //{
        //    if (id != fileItem.LocalFileName)
        //    {
        //        return BadRequest();
        //    }
        //    _context.Entry(fileItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!DataItemExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }
        //    return NoContent();
        //}

        // DELETE: api/DataItems/5
        [HttpDelete("{fileName}")]
        public async Task<IActionResult> DeleteDataItem(string fileName)
        {
            var dataItem = await _context.DataItems.FindAsync(fileName);
            if (dataItem == null)
            {
                return NotFound();
            }
            _context.DataItems.Remove(dataItem);
            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool DataItemExists(string id)
        {
            return _context.DataItems.Any(e => e.FileName == id);
        }
        //private readonly ILogger<DataItemsController> _logger;

        //public DataItemsController(ILogger<DataItemsController> logger)
        //{
        //    _logger = logger;
        //}
    }
}
